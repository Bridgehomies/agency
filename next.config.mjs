/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // 👈 comment this out temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/aboutus",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "bridgehomies.com" }],
        destination: "https://www.bridgehomies.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
