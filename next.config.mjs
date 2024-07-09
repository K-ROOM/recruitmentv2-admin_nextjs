/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    env: {
        timeZone: 'Asia/Bangkok',
    },
    reactStrictMode: true,
    output: 'standalone',
    // useFileSystemPublicRoutes: false,
};

export default nextConfig;
