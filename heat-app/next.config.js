const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "pages");
    return config;
  },
  env: {
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
    NEXT_PUBLIC_TEST_2: "testest2",
  },
};

module.exports = nextConfig;
