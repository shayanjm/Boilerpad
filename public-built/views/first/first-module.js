define([ 'angular' ], function(angular) {
  'use strict';

  var second = angular.module('secondModule', []);

  second.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      controller  : 'firstController',
      templateUrl : 'views/first/first.html'
    });
  }]);

  second.controller('firstController', [ '$scope', function($scope) {
    $scope.items = [];
    $scope.item = null;

    $scope.addItem = function(item) {
      if (item === null) {
        return;
      }

      var newItem = angular.copy(item);
      $scope.items.push(newItem);
      $scope.item = null;
    };

    $scope.removeItem = function(index) {
      $scope.items.splice(index, 1);
    };
  }]);

  return second;
});
