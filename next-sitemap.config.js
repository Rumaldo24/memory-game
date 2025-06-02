/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.doblix.fun',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/admin'],
};
// This configuration file is used to generate a sitemap for the Next.js application.
// It specifies the site URL, enables the generation of robots.txt, sets the sitemap size limit,