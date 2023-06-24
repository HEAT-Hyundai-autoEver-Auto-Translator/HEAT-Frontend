const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  output: 'export',

  webpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, 'pages');
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
