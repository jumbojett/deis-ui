'use strict';

/**
 * @ngdoc service
 * @name deisApp.NotificationService
 * @description
 * # Notification
 * Service in the deisApp.
 */
var services = angular.module('deisApp');

// TODO: subscribe to server-side notices
services.factory('NotificationService', function () {
  this.alerts = [];
  this.add = function (alert) {
    if (typeof(alert) === 'string') {
      alert = {type: 'info', msg: alert};
    }

    this.alerts.push(alert);
  };

  return this;
}).value('LoadingService', {
  loadingCount: 0,
  disabled: false,
  isLoading: function () {
    return this.loadingCount > 0;
  },
  requested: function () {
    this.loadingCount += 1;
  },
  responded: function () {
    this.loadingCount -= 1;
  },
  disable: function () {
    this.disabled = false;
  },
  enable: function () {
    this.disabled = true;
  }
}).factory('LoadingInterceptor', ['NotificationService', 'LoadingService', '$q', function (NotificationService, LoadingService, $q) {
  return {
    request: function (config) {

      // Whitelist of URIs to bypass the visual loading event
      // This is useful when we're polling the server and don't want to display a loading indicator
      var whitelist = [
        /\/auth\/login/
      ];

      for (var regex in whitelist) {
        if (whitelist[regex].test(config.url))
          return config;
      }

      LoadingService.requested();
      return config;
    },
    response: function (response) {
      LoadingService.responded();
      return response;
    },
    responseError: function (rejection) {

      LoadingService.responded();

      // If reject message
      if (rejection.data.message)
        NotificationService.add({type: 'alert', msg: rejection.data.message});

      return $q.reject(rejection);
    }
  }
}]);
