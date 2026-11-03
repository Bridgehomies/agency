/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // 👈 comment this out temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          // Start the responsive LCP image as soon as response headers arrive.
          {
            key: "Link",
            value: '</team-mobile.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high; media="(max-width: 640px)", </team.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high; media="(min-width: 641px)"',
          },
        ],
      },
    ];
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
