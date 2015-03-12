'use strict';

/**
 * @ngdoc service
 * @name deisApp.Deisservice
 * @description
 * # Deisservice
 * Service in the deisApp.
 */
angular.module('deisApp')
  .service('Deisservice', ['$http', 'AUTH_EVENTS', '$rootScope', 'Session', function ($http, AUTH_EVENTS, $rootScope, Session) {

    var controller = "";

    this.login = function (username, password) {

      $http({
        url: controller + '/v1/auth/login/',
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
      return $http.get(controller + '/v1/apps');
    };

    this.appInfo = function (app) {
      return $http.get(controller + '/v1/apps/' + app);
    };

    this.appLogs = function (app) {
      return $http.get(controller + '/v1/apps/' + app + '/logs');
    };

    this.getAppConfig = function (app) {
      return $http.get(controller + '/v1/apps/' + app + '/config');
    };

    this.getAppPerms = function (app) {
      return $http.get(controller + '/v1/apps/' + app + '/perms');
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
