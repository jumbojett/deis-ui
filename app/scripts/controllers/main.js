'use strict';

/**
 * @ngdoc function
 * @name deisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the deisApp
 */
angular.module('deisApp')
  .controller('MainCtrl', function ($scope, Deisservice, Session) {

    $scope.username = Session.username;

    $scope.apps = [];
    $scope.fetchApps = function () {
      Deisservice.apps().success(function (data) {
        $scope.apps = data.results;
      });
    };
    $scope.fetchApps();


  });
