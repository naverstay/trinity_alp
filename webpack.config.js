// Core
const merge = require('webpack-merge');

// Configs
const common = require('./config/webpack.common');
const dev = require('./config/webpack.dev');
const prod = require('./config/webpack.prod');

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        return merge(common(true), dev);
    }

    if (argv.mode === 'production') {
        return merge(common(false), prod);
    }
};
