/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");

const config = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    domains: ["k.kakaocdn.net", "localhost", "bbunmap.com", "www.bbunmap.com"],
  },
};

const nextConfig = withPWA({
  dest: "public",
  disable: false,
  runtimeCaching: [],
})(config);

module.exports = nextConfig;
