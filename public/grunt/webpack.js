var webpack = require('webpack');
var ComponentPlugin = require("component-webpack-plugin");
//__dirname текущая директория public/grunt/
//__filename


module.exports = {
    // http://babeljs.io/docs/using-babel/#webpack
    // https://github.com/webpack/grunt-webpack
    build: {

        devtool: 'source-map',
        debug: true,

        watch: true, // использовать совместно с keepalive
        keepalive: true,

        //inline: true, //не понял! embed the webpack-dev-server runtime into the bundle // Defaults to false
        //hot: false, // использовать совместно // и если раз включил, то нужно отключать указывая false!

        stats: {
            // Configure the console output
            //colors: '#999', // не понял!
            //modules: true, // дерево зависимовтей модулей
            //reasons: true // не понял!
        },

        //entry: './assets/js/routers.js',
        entry: {
            js: './assets/js/routers.js',
            css: './assets/js/routers.js'
        },
        output: {
            path: './dist/',
            filename: 'main.js'
        },
        module: {
            loaders: [ // https://github.com/babel/babel-loader
                {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'}
                //{test: /\.(css||scss)$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
                //{test: /\.png$/, loader: "url-loader?limit=100000" },
                //{test: /\.jpg$/, loader: "file-loader" }
            ]
        }
        //resolve: {
        //    modulesDirectories: ['assets/js','node_modules', 'bower_components']
        //}
        //noParse: ['./node_modules/jquery/dist/jquery','./node_modules/backbone','./node_modules/underscore']
        ,plugins: [
            new ComponentPlugin() // the gallery work as component.js, this plugin load this library
            //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
        ]
    }

};