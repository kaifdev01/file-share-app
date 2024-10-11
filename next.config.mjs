/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assets.acme.com', "cdn-icons-png.flaticon.com"],
    },

};
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({
//     nextConfig
// });
export default nextConfig;

