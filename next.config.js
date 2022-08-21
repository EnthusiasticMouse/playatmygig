/** @type {import('next').NextConfig} */
const webpack = require('webpack');
require('dotenv').config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
