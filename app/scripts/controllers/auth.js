'use strict';

/**
 * @ngdoc function
 * @name deisApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the deisApp
 */
angular.module('deisApp')
  .controller('AuthCtrl', function ($scope, Deisservice, AUTH_EVENTS) {
    $scope.submit = function () {

      // Both are required
      if (!$scope.username || !$scope.password)
        return;

      $scope.failed = false;
      Deisservice.login($scope.username, $scope.password);
    };

    $scope.$on(AUTH_EVENTS.loginFailed, function () {
      $scope.failed = true;
    });

  });
