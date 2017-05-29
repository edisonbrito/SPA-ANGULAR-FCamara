(function() {
    'use strict';

    angular
        .module('FCamara')
        .controller('LoginController', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$http', '$location', 'authentication', '$mdDialog'];

    function Controller($scope, $rootScope, $http, $location, authentication, $mdDialog) {
        $rootScope.isLoggedIn = null;
        $rootScope.currentUser = null;

        authentication.logout();

        $scope.model = {};

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form) {
                $scope.processando = true;

                authentication
                    .login($scope.model)
                    .then(function(res) {
                        if (res.status == 200) {
                            $location.path('/');
                        } else {
                            $scope.showMensagem(res.data.errors);
                        }

                        $scope.submitted = false;
                        $scope.processando = false;
                    });
            }
        };

        $scope.showMensagem = function(res) {
            var alert;
            var mensagens = res;
            $scope.conteudoMsg = "";

            for (var i = 0; i < mensagens.length; i++) {
                $scope.conteudoMsg += mensagens[i].message + "<br/>";
            }

            $mdDialog.show({
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                template: '<md-dialog>' +
                    '<form ng-cloak>' +
                    '<md-toolbar>' +
                    '<div class="md-toolbar-tools">' +
                    '<h2>Ops!</h2>' +
                    '</div>' +
                    '</md-toolbar>' +
                    '<md-dialog-content>' +
                    '<div class="md-dialog-content">' +
                    '<p>' + $scope.conteudoMsg + '</p>' +
                    '</div>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions layout="row">' +
                    '<md-button ng-click="closeDialog()">Fechar</md-button>' +
                    '</md-dialog-actions>' +
                    '</form>' +
                    '</md-dialog>',
                locals: {

                },
                controller: DialogController
            });

            function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
        };
    }
})();