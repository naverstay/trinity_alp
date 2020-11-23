const PATHS = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUG_LOADER = {
    loader: 'pug-loader',
    options: {
        pretty: true
    }
};

const BABEL_LOADER = {
    loader: 'babel-loader',
    options: {
        presets: [
            '@babel/preset-env'
        ]
    }
};

const MINI_CSS_EXTRACT_PLUGIN = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '../'
    }
};

const CSS_LOADER = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        importLoaders: 1
    }
};

const POST_CSS_LOADER = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true
    }
};

const SASS_LOADER = {
    loader: 'sass-loader',
    options: {
        sourceMap: true
    }
};

const IMAGE_LOADER = {
    loader: 'file-loader',
    options: {
        //name(file,q,w) {
        //    console.log('file-loader', file,q,w);
        //    // generate path dynamically here
        //    const newPath = '[hash].[ext]';
        //
        //    return '[path][name].[ext]';
        //}
        name: '[path][name].[ext]'
    }
};

const FONTS_LOADER = {
    loader: 'file-loader',
    options: {
        //name(file, q, w) {
        //    console.log('font-loader', file, q, w);
        //    // generate path dynamically here
        //    const newPath = '[hash].[ext]';
        //
        //    return '[path][name].[ext]';
        //}
        name: 'fonts/[name].[ext]'
    }
};

const loaders = [
    {
        test: /\.pug$/,
        use: [
            PUG_LOADER
        ]
    },
    {
        test: /\.js$/,
        use: [
            BABEL_LOADER
        ]
    },
    {
        test: /\.css$/,
        use: [
            MINI_CSS_EXTRACT_PLUGIN,
            CSS_LOADER,
            POST_CSS_LOADER
        ]
    },
    {
        // Support .sass and .scss
        test: /\.s[ac]ss$/,
        use: [
            MINI_CSS_EXTRACT_PLUGIN,
            CSS_LOADER,
            POST_CSS_LOADER,
            SASS_LOADER
        ]
    },
    {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: [/fonts/],
        use: [
            IMAGE_LOADER
        ]
    },
    {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        exclude: [/media/],
        use: [
            FONTS_LOADER
        ]
    }
];

module.exports = loaders;
