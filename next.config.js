module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "arweave.net",
      "coldcdn.com",
      "firebasestorage.googleapis.com",
      "pbs.twimg.com",
      "lh3.googleusercontent.com",
      "twitter.com",
      "source.unsplash.com",
      "abs.twimg.com",
    ],
  },
  experimental: { esmExternals: true },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "remote-component.config.js": __dirname + "/remote-component.config.js",
    };

    return config;
  },
};
