/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.schoolgirlstyle.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/edit/*', '/server-sitemap-index.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.schoolgirlstyle.com/server-sitemap-index.xml', // <==== Add here
    ],
  },
};
