const SITE_URL = 'https://www.schoolgirlstyle.com';
const CANONICAL_UPLOAD_ORIGIN = 'https://schoolgirlstyle.purveu.a2hosted.com';

const OPTIMIZABLE_HOSTS = new Set([
  'res.cloudinary.com',
  'schoolgirlstyle.com',
  'cdn.shopify.com',
  'schoolgirlstyle.purveu.a2hosted.com',
  'shopschoolgirlstyle.com',
  'www.schoolgirlstyle.com',
  'schoolgirlstyle.purveu.sa2hosted.com',
  'placehold.co',
]);

const UPLOAD_HOSTS = new Set([
  'schoolgirlstyle.purveu.a2hosted.com',
  'schoolgirlstyle.purveu.sa2hosted.com',
  'schoolgirlstyle.com',
  'www.schoolgirlstyle.com',
  'purveu.a2hosted.com',
]);

const OPTIMIZER_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nearestWidth(width) {
  return OPTIMIZER_WIDTHS.reduce((closest, candidate) =>
    Math.abs(candidate - width) < Math.abs(closest - width) ? candidate : closest
  );
}

function decodeHtml(value) {
  return value.replace(/&amp;/g, '&').replace(/&#038;/g, '&');
}

function widthFromFilename(url) {
  const match = url.match(/-(\d+)x\d+\.(jpe?g|png|webp)/i);
  return match ? parseInt(match[1], 10) : 0;
}

export function canonicalUploadUrl(src) {
  if (!src || typeof src !== 'string') return null;

  let value = src.trim();
  if (!value || value.startsWith('data:')) return null;
  if (value.startsWith('//')) value = `https:${value}`;
  if (value.startsWith('/wp-content/')) {
    value = `${CANONICAL_UPLOAD_ORIGIN}${value}`;
  }

  try {
    const url = new URL(value);
    if (!UPLOAD_HOSTS.has(url.hostname)) return null;
    if (!url.pathname.includes('/wp-content/uploads/')) return null;
    return `${CANONICAL_UPLOAD_ORIGIN}${url.pathname}`;
  } catch {
    return null;
  }
}

export function isWpUpload(src) {
  return Boolean(canonicalUploadUrl(src));
}

export function isImageSource(src) {
  return (
    typeof src === 'string' &&
    (src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('/') ||
      src.startsWith('data:'))
  );
}

export function isOptimizableImage(src) {
  if (!src || typeof src !== 'string') return false;
  if (/\.svg(\?|$)/i.test(src)) return false;
  if (src.startsWith('/') && !src.startsWith('//')) return true;

  try {
    return OPTIMIZABLE_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function optimizerPath(url, width, asHtml = false) {
  const safeWidth = OPTIMIZER_WIDTHS.includes(width)
    ? width
    : nearestWidth(width);
  const amp = asHtml ? '&amp;' : '&';
  return `/_next/image?url=${encodeURIComponent(url)}${amp}w=${safeWidth}${amp}q=75`;
}

export function publicOptimizerUrl(src, width = 1200) {
  if (!src) return '';
  const source = canonicalUploadUrl(src) || src;
  if (!isOptimizableImage(source)) return src;
  return `${SITE_URL}${optimizerPath(source, width)}`;
}

export function pickSizedUrl(src, srcset, target = 1080) {
  if (!src && !srcset) return src;

  const candidates = [];
  const add = (url, width) => {
    const canonical = canonicalUploadUrl(decodeHtml(url || ''));
    if (!canonical) return;
    candidates.push({
      url: canonical,
      width: width || widthFromFilename(canonical) || 0,
    });
  };

  add(src, widthFromFilename(src || ''));

  if (srcset) {
    srcset.split(',').forEach((part) => {
      const [url, descriptor] = part.trim().split(/\s+/);
      const width = descriptor?.endsWith('w') ? parseInt(descriptor, 10) : 0;
      add(url, width);
    });
  }

  const unique = [];
  const seen = new Set();
  candidates.forEach((candidate) => {
    if (seen.has(candidate.url)) return;
    seen.add(candidate.url);
    unique.push(candidate);
  });

  const sized = unique
    .filter((candidate) => candidate.width > 0)
    .sort((a, b) => a.width - b.width);

  if (!sized.length) return canonicalUploadUrl(src) || src;

  const withinTarget = sized.filter((candidate) => candidate.width <= target);
  if (withinTarget.length) return withinTarget[withinTarget.length - 1].url;
  return sized[0].url;
}

export function rewriteContentImages(html) {
  if (!html) return html;

  return html.replace(/<img\b([\s\S]*?)\/?\s*>/gi, (tag) => {
    const srcMatch = tag.match(/\bsrc\s*=\s*(['"])([\s\S]*?)\1/i);
    if (!srcMatch) return tag;

    const src = decodeHtml(srcMatch[2]);
    if (/\.(gif|svg)(\?|$)/i.test(src)) return tag;

    const srcset = decodeHtml(
      tag.match(/\bsrcset\s*=\s*(['"])([\s\S]*?)\1/i)?.[2] || ''
    );
    const hasUpload =
      isWpUpload(src) ||
      srcset.split(',').some((part) => isWpUpload(part.trim().split(/\s+/)[0]));

    if (!hasUpload) return tag;

    const chosen = pickSizedUrl(src, srcset, 1080);
    const source = canonicalUploadUrl(chosen) || chosen;
    if (!source) return tag;

    let nextTag = tag.replace(
      srcMatch[0],
      ` src=${srcMatch[1]}${optimizerPath(source, 1080, true)}${srcMatch[1]}`
    );
    nextTag = nextTag.replace(
      /\s(?:srcset|sizes|data-src|data-srcset|data-lazy-src|data-orig-file)\s*=\s*(['"])[\s\S]*?\1/gi,
      ''
    );
    return nextTag;
  });
}
