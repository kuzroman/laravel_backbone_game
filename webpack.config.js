const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

let PROD = 0;//JSON.parse(process.env.PROD_ENV || '0');
let pathTo = {
    dist: path.resolve(__dirname, 'dist'),
    js: path.resolve(__dirname, 'assets/js/routers.js'),
    sass: path.resolve(__dirname, 'src/sass'),
    twig: path.resolve(__dirname, 'src/twig'),
};

// webpack // webpack --progress --colors --watch
module.exports = {

    entry: pathTo.js,
    output: {
        filename: PROD ? 'main.min.js' : 'main.js',
        path: pathTo.dist
    },

    plugins: PROD ? [
            new ExtractTextPlugin('main.css'),
            new webpack.ProvidePlugin({$: 'jquery', _: 'underscore', Backbone: 'backbone'}),
            new webpack.optimize.UglifyJsPlugin()
        ] : [
            new ExtractTextPlugin('main.css'),
            new webpack.ProvidePlugin({$: 'jquery', _: 'underscore', Backbone: 'backbone'}),
        ],

    resolve: { // path to scripts for imports & require in .js
        modules: [pathTo.js, pathTo.sass, pathTo.twig, 'node_modules']
    },

    module: {
        rules: [

            { // it need if we want use Uglify with es6
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            { // Extract css
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                })
            },

            {test: /\.(png||svg)$/, loader: 'url-loader?limit=100000' },
            {test: /\.jpg$/, loader: 'file-loader' },
        ]
    }

};


// //var webpack = require("webpack");
// var ComponentPlugin = require("component-webpack-plugin");
// //var WebpackDevServer = require("webpack-dev-server");
//
// console.log('__dirname', __dirname);
//
// module.exports = {
//     build: {
        //watch: true, // keepalive
        //keepalive: true,
        //stats: {},
//
//         entry: {
//            app: ['./assets/js/routers.js']
//         },
//         output: {
//            path: './dist/',
//            filename: 'main.js'
//         },
//         module: {
//            loaders: [ // https://github.com/babel/babel-loader
//                {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'},
//                //{test: /\.(css||scss)$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
//                {test: /\.(css||scss)$/, loaders: ["style", "css", "sass"]},
//                {test: /\.(png||svg)$/, loader: "url-loader?limit=100000" },
//                {test: /\.jpg$/, loader: "file-loader" }
//            ]
//         },
//         plugins: [
//            new webpack.ProvidePlugin({
//                $: "jquery",
//                "_": "underscore"
//            }),
//            new ComponentPlugin() // the gallery work as component.js, this plugin load this library
//         ]
//     }
// };