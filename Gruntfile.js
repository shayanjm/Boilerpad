var path = require('path'),
    DEV  = path.resolve('./public/'),
    BLT  = path.resolve('./public-built/');

module.exports = function(grunt) {
  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Karma test runner configuration
    karma : {
      options : {
        browsers     : [ 'PhantomJS' ],
        basePath     : path.resolve('./public'),
        autoWatch    : true,
        reporters    : [ 'progress' ]
      },
      spec : {
        configFile   : path.resolve('./config/karma/karma.spec.js'),
        runnerPort   : 1317,
        singleRun    : true
      },
      e2e : {
        urlRoot      :'/__karma__/',
        configFile   : path.resolve('./config/karma/karma.e2e.js'),
        runnerPort   : 1320,
        proxies      : {
          '/': 'http://localhost:3000/'
        }
      }
    },

    // Jshint configuration
    jshint : {
      config : [ 'config/**/*.js' ],
      server : [ 'app/**/*.js' ],
      client : [ 'public/**/*.js', '!public/js/vendor/**/*.js', '!public/test/vendor/**/*.js' ]
    },

    // Express server
    express: {
      livereload: {
        options: {
          port: 9000,
          monitor: {},
          debug: true,
          server: path.resolve('./app/server')
        }
      }
    },

    // Watch for file system changes and trigger events based off that.
    regarde: {
      js: {
        files: [
          '**/*.js',
          '!node_modules/**/*.js',
          '!public/js/vendor/**/*.js',
          'views/**/*.jade'
        ],
        tasks: [ 'jshint', 'test', 'karma' ],
        spawn: true
      },
      css: {
        files: '**/*.scss',
        events: true
      }
    },

    // Clean rule, delete the folder
    clean: {
      dist : [ "public-built/" ]
    },

    // RequireJS r.js concat and minimize config
    requirejs: {
      compile: {
        options: {
          optimize                : 'uglify2',
          generateSourceMaps      : true,
          preserveLicenseComments : false,
          baseUrl                 : "public",
          name                    : "main",
          mainConfigFile          : DEV + "/main.js",
          out                     : BLT + "/main.js"
        }
      }
    },

    // Copy task
    copy: {
      dist: {
        files: [
         { expand: true, cwd: DEV, src: ['**'], dest: BLT }
        ]
      }
    },

    // Setting environment variables for different scenarios
    env : {
      dev : {
        PUBLIC : 'public'
      },
      build : {
        PUBLIC : 'public-built'
      }
    },

    // Bower hooks for require.js. Automatically linking bower files to main module.
    bower: {
      target: {
        rjsConfig: DEV + '/main.js'
      }
    },

    // Uglify
    uglify: {
      build: {
        files: {
          'public-built/js/vendor/requirejs/require.js' : [ DEV + '/js/vendor/requirejs/require.js' ]
        }
      }
    },

    // Jasmine runner for node unit tests
    jasmine: {
      spec: {
        options: {
          specs: 'test/spec/*.test.js'
        }
      }
    },

    // Cpncurrent tasks
    concurrent: {
      test:    [ 'jasmine', 'karma:spec']
    }
  });

  // Load grunt NPM tasks.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Register tasks
  grunt.registerTask('default', [ 'test:spec' ]);
  grunt.registerTask('server',       [ 'bower', 'env:dev', 'livereload-start', 'express', 'watch' ]);
  grunt.registerTask('server:built', [ 'env:build', 'express' ]);
  grunt.registerTask('watch', [ 'regarde' ]);
  grunt.registerTask('build', [ 'clean', 'copy', 'uglify', 'requirejs' ]);

  // Testing tasks ftw
  grunt.registerTask('test:spec', [ 'karma:spec' ]);
  grunt.registerTask('test:e2e', [ 'karma:e2e' ]);
  grunt.registerTask('test:all', [ 'concurrent:test', 'karma:e2e' ]);
  grunt.registerTask('test', [ 'concurrent:test' ]);
};
