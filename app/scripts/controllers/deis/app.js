'use strict';

/**
 * @ngdoc function
 * @name deisApp.controller:DeisAppCtrl
 * @description
 * # DeisAppCtrl
 * Controller of the deisApp
 */
angular.module('deisApp')
  .controller('DeisAppCtrl', function ($scope, Deisservice, $routeParams) {

    $scope.info = {};
    $scope.fetchInfo = function () {
      Deisservice.appInfo($routeParams.name).success(function (data) {
        $scope.info = data;
      });
    };
    $scope.fetchInfo();

    $scope.logs = {};
    $scope.fetchLogs = function () {
      Deisservice.appLogs($routeParams.name).success(function (data) {
        $scope.logs = data;
      });
    };
    $scope.fetchLogs();

    $scope.config = {};
    $scope.fetchConfig = function () {
      Deisservice.getAppConfig($routeParams.name).success(function (data) {
        $scope.config = data;
      });
    };
    $scope.fetchConfig();

    $scope.perms = {};
    $scope.fetchPerms = function () {
      Deisservice.getAppPerms($routeParams.name).success(function (data) {
        $scope.perms = data;
      });
    };
    $scope.fetchPerms();

  });
