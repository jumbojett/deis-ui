'use strict';

/**
 * @ngdoc function
 * @name deisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the deisApp
 */
angular.module('deisApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
