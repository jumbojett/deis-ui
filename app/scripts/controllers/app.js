'use strict';

/**
 * @ngdoc function
 * @name deisApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the deisApp
 */
angular.module('deisApp')
  .controller('AppCtrl', function ($scope, Deisservice, AUTH_EVENTS, $location, LoadingService) {
    $scope.isAuthorized = Deisservice.isAuthorized;
    $scope.logout = Deisservice.logout;

    // Let's us display the views based on whether or not things are loading
    $scope.loadingService = LoadingService;

    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
      $location.path('/');
    });

    $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
      $location.path('/login');
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
      $location.path('/login');
    });

  });
