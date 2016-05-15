'use strict';
angular.module('app.core')
    .controller('mainCtrl', function($scope, utilService, AppSettings, authHelper, $http, $location) {
        var vm = this;
        vm.cdn = AppSettings.CDN;
        vm.go = go;
        vm.logout = logout;
        vm.message =  null;

        function go(param1, param2) {
            utilService.go(param1, param2);
        }

        $scope.$on(AppSettings.AUTH_EVENTS.authenticated, function(event, data) {
            authHelper.setAuthToken(data.UserId);
            authHelper.setSessionToken(data.SessionId);
            authHelper.redirect();
        });

         $scope.$on('newChatEvent', function(info){
            //to implement array that counts new incoming message - right now only shows 1
            vm.message = 1;
         });

          $scope.$on('openedChatList', function(info){
            
            vm.message = null;
         });

           

        function logout() {
            utilService.showLoader();
            $http
                .post(AppSettings.API_URL + 'auth/logout')
                .success(function() {
                    utilService.hideLoader();
                    authHelper.logout();
                    $location.path('/account/home');
                });
        }
    });
