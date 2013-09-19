require.config({
  "baseUrl": "public",
  "paths": {
    "angular": "js/vendor/angular/angular",
    "angular-cookies": "js/vendor/angular-cookies/angular-cookies",
    "jquery": "js/vendor/jquery/jquery"
  },
  "shim": {
    "angular": {
      "exports": "angular",
      "deps": [
        "jquery"
      ]
    }
  }
});

require([
  'angular',
  'views/first/first-module.js',
  'views/second/second-module.js'
], function(angular, firstModule, secondModule) {

  angular.bootstrap(document, [ firstModule.name, secondModule.name ]);
});
