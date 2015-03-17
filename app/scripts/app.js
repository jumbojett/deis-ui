'use strict';

/**
 * @ngdoc overview
 * @name deisApp
 * @description
 * # deisApp
 *
 * Main module of the application.
 */
angular
  .module('deisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'luegg.directives',
    'ui.bootstrap-slider',
    'config'
  ])
  .config(function ($routeProvider, $httpProvider, $locationProvider) {

    // Remove the hash
    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .when('/deis/app/:name', {
        templateUrl: 'views/deis/app.html',
        controller: 'DeisAppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('TokenInterceptor');
    $httpProvider.interceptors.push('LoadingInterceptor');

  }).filter('fromNow', function () {
    return function (date) {
      if (date === undefined) return;
      // Remove 'UTC' from the end of string
      date = date.slice(0, -3);
      return moment.utc(date).fromNow();
    }
  }).filter('capFirst', function () {
    return function (str) {
      if (str === undefined) return;
      return str.charAt(0).toUpperCase() + str.substring(1)
    }
  }).filter('fakeTerminal', function ($sce) {
    return function (str) {
      if (typeof str != 'string') return;

      // Remove quotes
      str = str.slice(0, -1).substring(1);
      // Format Date
      if (str.length > 1) str = '\\n' + str;
      str = str.replace(/\\n(.+?)UTC/g, function (match, date, offset, s) {
        return '<br/>' + moment.utc(date).fromNow();
      });
      // Newlines become html
      //str = str.replace(/\\n/g, '<br/>');
      // Remove Unicode Strings
      try {
        str = unescape(JSON.parse('"' + str.replace(/\"/g, '\\"') + '"'));
      } catch (e) {
        // Ignore JSON parse exceptions b/c we don't care
      }

      // Color code terminal strings
      str = ansi_up.ansi_to_html(str);

      // Return a trusted string
      return $sce.trustAsHtml(str);
    }
  });
