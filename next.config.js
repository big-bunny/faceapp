module.exports = {
  reactStrictMode: true,
  experimental: { appDir: true },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // resolver configuration for the server
      config.resolve = {
        ...config.resolve,
        // server resolver options...
      };
    } else {
      // resolver configuration for the client
      config.resolve = {
        ...config.resolve,
        // client resolver options...
      };
    }

    return config;
  },
};
