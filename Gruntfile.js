module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      web: {
        options: {
          script: 'app.js'
        }
      }
    },
    jshint: {
      files: ['app.js', 'core/**/*.js', 'test/**/*.js']
    },

   watch: {
    express: {
      files:  [ '<%= jshint.files %>', 'views/**/*.jade' ],
      tasks:  [ 'express:web' ],
      options: {
        nospawn: true //Without this option specified express won't be reloaded
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:web', 'watch']);
}