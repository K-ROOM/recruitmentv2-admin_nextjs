/** @type {import('next').NextConfig} */

import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    env: {
        timeZone: 'Asia/Bangkok',
    },
    reactStrictMode: true,
    // useFileSystemPublicRoutes: false,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, './'),
        };
        return config;
    },
};

export default nextConfig;
