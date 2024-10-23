/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: "/metrics",
        destination: "/login",
        permanent: false,
        has: [
          {
            type: "cookie",
            key: "token",
            value: undefined,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
