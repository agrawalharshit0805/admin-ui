const path = require('path');

module.exports = {
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader'
        }
      ]
    }
  };