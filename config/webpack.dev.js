// Tools
const PATHS = require('./paths');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    watch: true,
    devServer: {
        contentBase: PATHS.build,
        overlay: true
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
        })
    ]
};
