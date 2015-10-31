'use strict';

//const NODE_ENV = process.env.NODE_ENV || 'development';
const NODE_ENV = 'dev'; // dev || prod
const webpack = require('webpack');

module.exports = {

    devtool: 'source-map',
    debug: NODE_ENV == 'dev',

    //context: __dirname + '/assets/js/',
    entry: {
        main: './assets/js/routers.js',
        //mainncss: './assets/css/main.css'
    },
    output: {
        path: __dirname + '/build/',
        filename: '[name].js'
        // library: "[name]" // global param - from entry
    },

    watch: NODE_ENV == 'dev',

    module: {
        loaders: [ // https://github.com/babel/babel-loader
            {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'},
            {test: /\.(css||scss)$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            "_": "underscore"
        }),
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)}), // pass params in our project
        new webpack.NoErrorsPlugin(), // don't make build if have got error
    ]
};

if (NODE_ENV == 'prod') {
    module.exports.module.loaders[1].loaders = ["style", "css", "sass"];
    module.exports.module.loaders.push(
        {test: /\.(png||svg)$/, loader: "url-loader?limit=100000"},
        {test: /\.jpg$/, loader: "file-loader"}
    );
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, drop_console: true } })
    )
}


/**
 * very useful plugin, if make several .js on the different page
 * take a common chunk from all .js modules
 * and we can cached this file for all site pages
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),

 webpack --display-modules (-v) // show modules and their the build number
 webpack --json --profile > stats.json // make stats in file that can show it on webpack.github.io/analyse
 */