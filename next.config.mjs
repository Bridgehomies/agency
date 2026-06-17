/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // 👈 comment this out temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
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
