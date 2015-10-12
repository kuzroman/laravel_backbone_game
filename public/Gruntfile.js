'use strict';

module.exports = function(grunt) {
    // http://frontender.info/a-beginners-guide-to-grunt-redux/#aliasesyaml

    //var path = require('path');

    //require('time-grunt')(grunt); // measures the time each task takes
    require('load-grunt-tasks')(grunt); // вместо нативной загрузки модулей
    grunt.loadNpmTasks('grunt-browser-sync');
    require('load-grunt-config')(grunt, {
        jitGrunt: true
    });

    // Read configuration from package.json
    // pkg: grunt.file.readJSON('package.json')
};
