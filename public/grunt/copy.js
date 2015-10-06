module.exports = {

    // https://github.com/gruntjs/grunt-contrib-copy
    // просто копирует файлы
    main: {
        files: [{
            src: './assets/bower_components/jquery/dist/jquery.min.js',
            dest: './assets/js/lib/jquery.min.js'
        }]
    },
    postinstall: {
        src: './node_modules/babel/browser-polyfill.js',
        dest: './dist/browser-polyfill.js'}

};