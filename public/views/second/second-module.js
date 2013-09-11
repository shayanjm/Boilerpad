define([ 'angular' ], function(angular) {
  'use strict';

  var first = angular.module('firstModule', []);

  first.directive('appVersion', function() {
    return function(scope, element) {
      element.text(angular.version.full);
    };
  });
  return first;
});
