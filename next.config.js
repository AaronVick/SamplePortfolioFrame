const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['insert_vercel_link.vercel.app'], // Replace with your Vercel domain
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_BUILD_TIME': JSON.stringify(new Date().toISOString()),
      })
    );
    return config;
  },
};
