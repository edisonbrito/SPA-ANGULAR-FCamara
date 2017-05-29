(function() {

    angular
        .module('FCamara')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$localStorage', '$sessionStorage'];

    function authentication($http, $window, $localStorage, $sessionStorage) {

        var saveToken = function(token) {
            $window.localStorage['FCamara'] = token;
        };

        var getToken = function() {
            return $window.localStorage['FCamara'];
        };

        var isLoggedIn = function() {
            var token = getToken();

            if (token) {
                return true;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if (isLoggedIn()) {
                return $localStorage.user;
            }
        };

        login = function(user) {
            return $http({
                method: 'POST',
                //SUBSTITUA POR SUA URL
                url: 'http://localhost:49295/v1/authenticate',
                data: $.param(user),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(function(res) {
                saveToken(res.data.token);
                console.log(res.data.token);
                $localStorage.user = {
                    id: res.data.user.id,
                    username: res.data.user.username

                };

                return res;
            }, function(err) {
                return err;
            });
        };

        logout = function() {
            $window.localStorage.clear();
        };

        return {
            currentUser: currentUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout
        };
    }


})();