/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 this enables static export

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // 👈 important for image export
  },
}

export default nextConfig