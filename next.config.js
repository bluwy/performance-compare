/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required:
    appDir: true,
  },
};
// TODO: no way to configure sourcemaps? it always contain the sourcesContent field
// TODO: no way to specify `resolve.extensions`?

module.exports = nextConfig;
