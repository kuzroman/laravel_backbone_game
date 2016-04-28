module.exports = {

    // https://github.com/gruntjs/grunt-contrib-watch
    scripts: {
        files: [
            'assets/js/**/*.js'
            //'assets/js/*.js'
        ],
        tasks: ['webpack:build'],
        options: {
            //interrupt: true,
            spawn: false
            //livereload: true
        }
    }
    ,styles: {
        files: [
            'assets/css/*.scss'
        ],
        tasks: ['webpack:build']
    }
};