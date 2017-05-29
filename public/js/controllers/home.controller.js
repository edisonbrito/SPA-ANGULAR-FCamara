(function() {
    'use strict';

    angular
        .module('FCamara')
        .controller('HomeController', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$http', '$routeParams', 'authentication'];

    function Controller($scope, $rootScope, $http, $routeParams, authentication) {
        $scope.produtosInit = function() {
            $http({
                method: 'GET',
                //SUBSTITUA POR SUA URL
                url: 'http://localhost:49295/v1/products',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "bearer " + authentication.getToken()
                }
            }).then(function(result) {
                $scope.products = result.data;
            }, function(error) {
                // console.log('Error', error);

                toastr.error(error.data.error_description, error.statusText);
            });
        };

        $scope.produtosInit();


    }
})();