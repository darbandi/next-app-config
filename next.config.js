/** @type {import('next').NextConfig} */

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.next\//],
      runtimeCaching: [
        {
          handler: 'networkFirst',
          urlPattern: /^https?.*/,
        },
      ],
    }),
  ],
  // webpack: (config) => {
  //   config.plugins.push(
  //     new SWPrecacheWebpackPlugin({
  //       minify: true,
  //       staticFileGlobsIgnorePatterns: [/\.next\//],
  //       runtimeCaching: [
  //         {
  //           handler: 'networkFirst',
  //           urlPattern: /^https?.*/,
  //         },
  //       ],
  //     })
  //   );
  //   return config;
  // },
};

module.exports = withPWA(nextConfig);
