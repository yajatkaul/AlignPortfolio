export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // Proxy to the external API
      },
    ];
  },
};
