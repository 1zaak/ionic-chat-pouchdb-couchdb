'use strict';
angular.module('app.core')
    .directive('myProfile', function() {
        function myProfileCtrl($scope, $rootScope, AppSettings, $http, $q) {
            var vm = this;
            vm.cdn = AppSettings.CDN;
            vm.item = {};
            vm.isLoading = false;
            vm.loadData = loadData();

            $scope.$on(AppSettings.PAGE_EVENTS.profileChanged, function() {
                loadData();
            });

            function loadData() {
                vm.isLoading = true;
                getMyProfile().then(function(result) {
                    result.ProfilePic = vm.cdn + '/profile-pics/' + result.ProfilePic;
                    result.CoverPic = vm.cdn + '/cover-pics/' + result.CoverPic;
                    vm.item = result;
                    $rootScope.Userno = vm.item.UserNo;
                    vm.isLoading = false;
                });
            }


            function getMyProfile() {
                var deferred = $q.defer();
                $http
                    .get(AppSettings.API_URL + 'seller-profile-simple')
                    .success(deferred.resolve)
                    .error(deferred.reject);

                return deferred.promise;
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'core/directives/my-profile/my-profile.html',
            controller: myProfileCtrl,
            controllerAs: 'directive'
        };
    });
