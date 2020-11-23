// Tools
const PATHS = require('./paths');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prod = {
    output: {
        filename: 'js/[name].[hash].js'
    },

    devtool: 'source-map',

    plugins: [
        //new CopyWebpackPlugin({
        //    patterns: [
        //        {
        //            from: '../manifest.json',
        //            to: 'manifest.json'
        //        },
        //        {
        //            from: '../browserconfig.xml',
        //            to: 'browserconfig.xml'
        //        },
        //        {
        //            from: '../source/media/favicons/android-chrome-192x192.png',
        //            to: 'source/media/android-chrome-192x192.png'
        //        },
        //        {
        //            from: '../source/media/favicons/android-chrome-256x256.png',
        //            to: 'source/media/android-chrome-256x256.png'
        //        },
        //        {
        //            from: '../source/media/favicons/mstile-150x150.png',
        //            to: 'source/media/mstile-150x150.png'
        //        }
        //    ]
        //}),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css',
            chunkFilename: 'styles/[id].[hash].css'
        })
    ]
};

module.exports = prod;
