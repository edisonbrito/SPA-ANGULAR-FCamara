// APP START
// -----------------------------------

(function() {
    'use strict';

    var myApp = angular
        .module('FCamara', [
            'ngRoute',
            'ngAnimate',
            'ngSanitize',
            'ngStorage',
            'ngMaterial'
        ]);

    myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');

        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home/index.html'
            })
            .when('/Login', {
                templateUrl: 'public/views/login/index.html'
            })
            .otherwise({
                redirectTo: '/Login'
            });


    }]);


    myApp.run(['$rootScope', '$route', 'authentication', '$location', function($rootScope, $route, authentication, $location) {
        $rootScope.$on('$routeChangeStart', function(event, next, nextRoute, currentRoute) {
            $rootScope.isLoggedIn = authentication.isLoggedIn();
            $rootScope.currentUser = authentication.currentUser();

            var restrictedPage = $.inArray($location.path(), ['/Login']) === -1;

            if (restrictedPage && !authentication.isLoggedIn()) {
                $location.path('/Login');
            }
        });
    }]);
})();