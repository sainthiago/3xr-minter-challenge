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
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "remote-component.config.js": __dirname + "/remote-component.config.js",
    };

    return config;
  },
};
