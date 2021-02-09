const path = require('path');
module.exports = (config, env) => {
  // Use file-loader to copy WebAssembly files
  // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js#L378
  // CHANGED TO rules[1], 2 EXCEEDS THE SIZE OF THE module ARRAY
  config.module.rules[1].oneOf.unshift({
    test: /\.wasm$/,
    type: 'javascript/auto',
    loader: 'file-loader',
  });
  return config;
};