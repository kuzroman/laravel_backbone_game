var webpack = require('webpack');
var ComponentPlugin = require("component-webpack-plugin");
//__dirname public/grunt/
//__filename
//var node_dir = __dirname + '/../node_modules';
//console.log('node_dir', node_dir); //  C:\wamp\www\laravel_backbone_game\public\grunt/node_modules

module.exports = {
    // http://babeljs.io/docs/using-babel/#webpack
    // https://github.com/webpack/grunt-webpack
    build: {

        //devtool: 'source-map',
        //debug: true,

        watch: true, // keepalive
        keepalive: true,

        //inline: true, // embed the webpack-dev-server runtime into the bundle // Defaults to false
        //hot: false, // false!

        stats: {
            // Configure the console output
            //colors: '#999',
            //modules: true,
            //reasons: true
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
                {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'},
                //{test: /\.(css||scss)$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
                {test: /\.(css||scss)$/, loaders: ["style", "css", "sass"]},
                {test: /\.(png||svg)$/, loader: "url-loader?limit=100000" },
                {test: /\.jpg$/, loader: "file-loader" }
            ]
        },
        //resolve: {
            //modulesDirectories: ['assets/js','node_modules', 'bower_components']
            //$: node_dir + '/jquery/dist/jquery.min.js',
            //underscore: resolveNpmPath('/underscore/underscore.js')
        //},
        //noParse: ['./node_modules/jquery/dist/jquery','./node_modules/backbone','./node_modules/underscore']
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                "_": "underscore"
            }),
            new ComponentPlugin(), // the gallery work as component.js, this plugin load this library
            //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }) // включить
        ],
        //externals: {
        //    $: 'jquery',
        //    _: 'underscore'
        //}
    }
};