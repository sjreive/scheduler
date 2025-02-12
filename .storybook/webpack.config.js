const path = require("path");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    },
    devServer: {
      proxy: {
        '/api/days': 'http://localhost:3001'
      }
    }
  };
};
