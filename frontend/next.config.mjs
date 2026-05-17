/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"],
  allowedDevOrigins: ['172.19.39.28', 'localhost:3000'],
};

export default nextConfig;
