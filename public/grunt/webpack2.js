var webpack = require('webpack');

module.exports = {

    // http://babeljs.io/docs/using-babel/#webpack
    // https://github.com/webpack/grunt-webpack
    options: {
        entry: {
            routers: './assets/js/routers.js'
        },
        output: {
            path: './dist/',
            filename: 'main.js'
        },
        module: {
            loaders: [ // https://github.com/babel/babel-loader
                {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'}
                //{execute: /node_modules/, test: /\.js$/, loader: 'babel'}
                //{ test: /\.css$/, loader: "style!css" }
            ]
        }
        ,plugins: [
            new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ]
    },
    build: {
        devtool: 'source-map',
        debug: true
    }

};