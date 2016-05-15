'use strict';
angular.module('app.core')
    .directive('msBanner', function($ionicSlideBoxDelegate) {
        function msBannerCtrl($scope, AppSettings) {
            var vm = this;
            vm.cdn = AppSettings.CDN;

            $scope.$watch('bannerlist', function(n) {
                vm.banners = n;
                $ionicSlideBoxDelegate.update();
            });
        }

        return {
            restrict: 'E',
            controller: msBannerCtrl,
            controllerAs: 'directive',
            scope: {
                bannerlist: '='
            },
            templateUrl: 'core/directives/ms-banner/ms-banner.html'
        };
    });
