/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'res.cloudinary.com',
      'schoolgirlstyle.com',
      'cdn.shopify.com',
      'schoolgirlstyle.purveu.a2hosted.com',
      'shopschoolgirlstyle.com',
      'www.schoolgirlstyle.com',
      'schoolgirlstyle.purveu.sa2hosted.com',
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
      {
        source: '/:year/:month/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2017/04/How-to-Edit-an-Editable-PDF.pdf',
        destination:
          'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/04/How-to-Edit-an-Editable-PDF.pdf',
        permanent: true,
      },
      {
        source:
          '/wp-content/uploads/2017/04/How-to-Edit-a-Power-Point-File.pdf',
        destination:
          'https://schoolgirlstyle.purveu.a2hosted.com/wp-content/uploads/2023/04/How-to-Edit-a-Power-Point-File.pdf',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
