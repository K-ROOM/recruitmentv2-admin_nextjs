/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    env: {
        timeZone: 'Asia/Bangkok',
    },
    reactStrictMode: true,
    // useFileSystemPublicRoutes: false,
};

export default nextConfig;
