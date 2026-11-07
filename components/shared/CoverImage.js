import Image from 'next/image';
import { canonicalUploadUrl } from '../../lib/wpImages';

export default function CoverImage({
  src,
  alt = '',
  sizes = '100vw',
  priority = false,
  className = '',
}) {
  const uploadUrl = canonicalUploadUrl(src);
  const alignTop = className.includes('object-top');

  if (uploadUrl) {
    return (
      <Image
        src={uploadUrl}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${alignTop ? 'object-top' : 'object-center'}`}
      />
    );
  }

  if (!src) return null;

  return (
    <div
      className={`absolute inset-0 bg-cover bg-no-repeat ${
        alignTop ? 'bg-top' : 'bg-center'
      }`}
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
