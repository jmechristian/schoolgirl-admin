import crypto from 'crypto';

function tokensMatch(provided, expected) {
  if (!provided || !expected) return false;

  const left = Buffer.from(String(provided));
  const right = Buffer.from(String(expected));
  if (left.length !== right.length) return false;

  return crypto.timingSafeEqual(left, right);
}

function cleanSlug(value) {
  const slug = Array.isArray(value) ? value[0] : value;
  if (typeof slug !== 'string') return null;

  const trimmed = slug.trim();
  if (!trimmed || trimmed.length > 200) return null;
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._%-]*$/.test(trimmed)) return null;
  if (trimmed.includes('..')) return null;

  return trimmed;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const provided =
    req.headers['x-revalidate-secret'] || req.query.secret || req.body?.secret;

  if (!tokensMatch(provided, process.env.REVALIDATE_SECRET)) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const slug = cleanSlug(
    req.query.slug ||
      req.body?.slug ||
      req.body?.post_name ||
      req.body?.post?.post_name ||
      req.body?.post?.slug
  );
  const paths = ['/blog', '/edit/blog'];
  if (slug) paths.push(`/blog/${slug}`);

  const refreshed = {};

  for (const path of paths) {
    try {
      await res.revalidate(path);
      refreshed[path] = true;
    } catch (error) {
      refreshed[path] = false;
    }
  }

  return res.json({ revalidated: true, refreshed });
}
