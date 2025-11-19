/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bridgehomies.com',  // Your canonical base URL (no trailing slash)
  generateRobotsTxt: true,  // Automatically generates robots.txt too
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // Optional: Exclude patterns if needed (e.g., for dynamic or private pages)
  exclude: ['/server-sitemap.xml'],  // Example; adjust as needed
  // Optional: Additional paths if you have more pages not auto-detected
  additionalPaths: async (config) => [
    await config.transform(config, '/design'),
    await config.transform(config, '/ai&ml'),
  ],
};