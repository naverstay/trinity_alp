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
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATHS.source + '/vendor/alpine.min.js',
                    to: PATHS.build + '/vendor/alpine.min.js'
                },
                {
                    from: PATHS.source + '/vendor/alpine-ie11.min.js',
                    to: PATHS.build + '/vendor/alpine-ie11.min.js'
                },
                {
                    from: PATHS.source + '/vendor/alpine.js',
                    to: PATHS.build + '/vendor/alpine.js'
                },
                {
                    from: PATHS.source + '/vendor/alpine-ie11.js',
                    to: PATHS.build + '/vendor/alpine-ie11.js'
                },
                {
                    from: PATHS.media + '/data/brand.json',
                    to: PATHS.build + '/source/data/brand.json'
                },
                {
                    from: PATHS.media + '/data/config2.json',
                    to: PATHS.build + '/source/data/config2.json'
                },
                {
                    from: PATHS.media + '/data/filter.json',
                    to: PATHS.build + '/source/data/filter.json'
                },
                {
                    from: PATHS.source + '/../manifest.json',
                    to: PATHS.build + '/manifest.json'
                },
                {
                    from: PATHS.source + '/../browserconfig.xml',
                    to: PATHS.build + '/browserconfig.xml'
                },
                {
                    from: PATHS.source + '/../source/media/favicons/android-chrome-192x192.png',
                    to: PATHS.build + '/source/media/android-chrome-192x192.png'
                },
                {
                    from: PATHS.source + '/../source/media/favicons/android-chrome-256x256.png',
                    to: PATHS.build + '/source/media/android-chrome-256x256.png'
                },
                {
                    from: PATHS.source + '/../source/media/favicons/mstile-150x150.png',
                    to: PATHS.build + '/source/media/mstile-150x150.png'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css',
            chunkFilename: 'styles/[id].[hash].css'
        })
    ]
};

module.exports = prod;
