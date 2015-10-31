'use strict';

module.exports = function(grunt) {
    //require('time-grunt')(grunt); // measures the time each task takes
    require('load-grunt-tasks')(grunt); // instead native loaded
    grunt.loadNpmTasks('grunt-browser-sync');
    require('load-grunt-config')(grunt, {
        jitGrunt: true
    });
    // Read configuration from package.json
    // pkg: grunt.file.readJSON('package.json')
};
