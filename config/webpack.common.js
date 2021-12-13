// Core
const webpack = require('webpack');

// Tools
const LOADERS = require('./loaders');
const PATHS = require('./paths');
const PAGES = require('./../pages');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (dev) => {
    return {
        /**
         * What happens there?
         * We need to create multiple pages and each page require to own `entry`.
         * We get theirs dynamically from `PAGES` variable.
         */
        entry: (() => {
            const entries = {app: PATHS.source + '/app.js'};

            PAGES.forEach(page => entries[page] = PATHS.source + `/pug/pages/${page}/index.js`);

            return entries;
        })(),

        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },

        module: {
            rules: LOADERS(dev)
        },

        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        name: 'common',
                        chunks: 'initial',
                        minChunks: 1
                    }
                }
            }
        },

        resolve: {
            alias: {
                media: PATHS.media,
                fonts: PATHS.fonts,
                styles: PATHS.styles
            }
        },

        /**
         * What happens there?
         * Option `plugins` get an array of plugins for webpack. But in our case, we can have many pages.
         * And for each page, we need to initialize a new instance of HtmlWebpackPlugin.
         * We make it dynamically from `PAGES` array.
         * In the end, we concatenate array with all our pages with other webpack plugins.
         */
        plugins: PAGES.map((page) => new HtmlWebpackPlugin({
            template: PATHS.source + `/pug/pages/${page}/index.pug`,
            filename: `${page}.html`,
            chunks: [
                'common',
                'app',
                page
            ],
            inject: 'body'
        })).concat([new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATHS.source + '/vendor/just-validate.production.min.js',
                    to: PATHS.build + '/vendor/just-validate.production.min.js'
                },
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
        })])
    };
}
