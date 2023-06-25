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
  // 이미지 최적화 에러로 인해 꺼둠
  images: { unoptimized: true },
};

module.exports = nextConfig;
