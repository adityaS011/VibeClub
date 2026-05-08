/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'img.clerk.com',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'images.clerk.dev',
        protocol: 'https',
        port: ''
      }
    ]
  }
};

export default nextConfig;
