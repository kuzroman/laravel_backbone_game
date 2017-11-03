//var gulp = require('gulp');
//var webpack = require('webpack-stream');
//
//gulp.task('default', function() {
//    return gulp.src('./assets/js/routers.js')
//        .pipe(webpack( require('./gulp/webpack.js') ))
//        .pipe(gulp.dest('dist/'));
//});

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var ComponentPlugin = require("component-webpack-plugin");
var WebpackDevServer = require("webpack-dev-server");


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        watch: true, // keepalive
        keepalive: true,
        stats: {},
        entry: {
            app: ["./assets/js/routers.js"]
            //js: './assets/js/routers.js',
            //css: './assets/js/routers.js'
        },
        output: {
            path: '/portfolio/dist/',
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
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                "_": "underscore"
            }),
            new ComponentPlugin() // the gallery work as component.js, this plugin load this library
        ]
    });

    new WebpackDevServer(compiler, {
        webpackMiddleware: { stats: 'errors-only', noInfo: true }
        // server and middleware options
    }).listen(80, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:80/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

//gulp.task("webpack", function(callback) {
//    // run webpack
//    webpack({
//
//        watch: true, // keepalive
//        keepalive: true,
//        stats: {},
//        //entry: './assets/js/routers.js',
//        entry: {
//            js: './assets/js/routers.js',
//            css: './assets/js/routers.js'
//        },
//        output: {
//            path: './dist/',
//            filename: 'main.js'
//        },
//        module: {
//            loaders: [ // https://github.com/babel/babel-loader
//                {exclude: /(node_modules|bower_components)/, test: /\.js$/, loader: 'babel'},
//                //{test: /\.(css||scss)$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
//                {test: /\.(css||scss)$/, loaders: ["style", "css", "sass"]},
//                {test: /\.(png||svg)$/, loader: "url-loader?limit=100000" },
//                {test: /\.jpg$/, loader: "file-loader" }
//            ]
//        },
//        plugins: [
//            new webpack.ProvidePlugin({
//                $: "jquery",
//                "_": "underscore"
//            }),
//            new ComponentPlugin(), // the gallery work as component.js, this plugin load this library
//        ]
//    }, function(err, stats) {
//        if(err) throw new gutil.PluginError("webpack", err);
//        gutil.log("[webpack]", stats.toString({
//            // output options
//        }));
//        callback();
//    });
//});