(function (window, require) {
  'use strict';
  var REGEXP = /^.*spec\/.*.test.js/,
      file,
      testModules = [];

  // Build the test files list
  for (file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (REGEXP.test(file)) {
        testModules.push(file);
      }
    }
  }

  // Start the application
  require({
    baseUrl:'/base/app/js',
    paths:{
    },
    shim:{
      angular  : {
       exports : 'angular'
      },
      resource : {
        deps : ['angular']
      },
      states   : {
       deps : ['angular']
      },
      mocks    : {
        deps : ['angular'], 'exports' : 'mocks'
      }
    },
    deps : testModules,
    callback: window.__karma__.start // Start the tests
  });

})(window, require);
