/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // 👈 comment this out temporarily
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig