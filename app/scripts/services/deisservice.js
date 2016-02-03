'use strict';

require('util');

/**
 * @ngdoc service
 * @name deisApp.Deisservice
 * @description
 * # Deisservice
 * Service in the deisApp.
 */
angular.module('deisApp')
  .service('Deisservice', ['$http', 'AUTH_EVENTS', '$rootScope', 'Session', 'ENV', function ($http, AUTH_EVENTS, $rootScope, Session, ENV) {

    var controller = ENV.DEIS_API || "http://deis.local3.deisapp.com";
    var api_version = ENV.DEIS_API_VERSION || "v2"

    this.login = function (username, password) {

      $http({
        url: util.format('%s/%s/auth/login/', controller, api_version),
        method: "POST",
        data: $.param({'username': username, 'password': password}, true),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data) {
        Session.create(username, data.token);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }).error(function (err) {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed, err);
      });

    };

    this.isAuthorized = function () {
      return Session.isActive();
    };

    this.logout = function () {
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      return Session.destroy();
    };

    /**
     * APPS
     * @returns {HttpPromise}
     */
    this.apps = function () {
      return $http.get(util.format('%s/%s/apps', controller, api_version));
    };

    this.appInfo = function (app) {
      return $http.get(util.format('%s/%s/apps/%s', controller, api_version, app));
    };

    this.appLogs = function (app) {
      return $http.get(util.format('%s/%s/apps/%s/logs', controller, api_version, app));
    };

    this.getAppConfig = function (app) {
      return $http.get(util.format('%s/%s/apps/%s/config', controller, api_version, app));
    };

    this.getAppPerms = function (app) {
      return $http.get(util.format('%s/%s/apps/%s/perms', controller, api_version, app));
    };

  }]
).factory('TokenInterceptor', ['$q', '$window', '$location', '$injector', 'Session', '$rootScope', 'AUTH_EVENTS', function ($q, $window, $location, $injector, Session, $rootScope, AUTH_EVENTS) {

    return {
      request: function (config) {
        config.headers = config.headers || {};

        if (Session.isActive())
          config.headers.Authorization = 'Token ' + Session.token;
        else
          $location.path('/login');

        return config;
      },

      /* Revoke client authentication if 401 is received */
      responseError: function (rejection) {

        if (rejection !== null && rejection.status === 401) {
          Session.destroy();
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        return $q.reject(rejection);
      }
    };
  }]).constant('AUTH_EVENTS', {

    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'

  }).value('Session', {

    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),

    destroy: function () {
      this.username = null;
      this.token = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
    },
    create: function (username, token) {
      this.username = username;
      this.token = token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
    },
    isActive: function () {
      return (this.token != null || sessionStorage.getItem('token'));
    }

  });
