// Tools
const PATHS = require('./paths');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    output: {
        filename: 'js/[name].js'
    },

    devtool: 'source-map',

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css',
            chunkFilename: 'styles/styles.css'
        })
    ]
};
