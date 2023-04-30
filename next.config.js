/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'schoolgirlstyle.com',
      'cdn.shopify.com',
      'schoolgirlstyle.purveu.a2hosted.com',
    ],
  },
  async redirects() {
    return [
      // Path Matching - will match `/old-blog/a`, but not `/old-blog/a/b`
      {
        source: '/:year/:month/:day/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
