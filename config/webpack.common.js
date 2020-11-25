// Core
const webpack = require('webpack');

// Tools
const LOADERS = require('./loaders');
const PATHS = require('./paths');
const PAGES = require('./../pages');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
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
        rules: LOADERS
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
    })).concat([
        //new webpack.ProvidePlugin({
        //  $: 'jquery',
        //  jQuery: 'jquery'
        //})
    ])
};

module.exports = common;
