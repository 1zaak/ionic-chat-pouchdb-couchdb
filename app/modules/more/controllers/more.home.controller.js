'use strict';
angular.module('app.more')
    .controller('moreHomeCtrl', function($scope, $ionicPlatform, $cordovaAppVersion) {
        var vm = this;
        vm.getVersionInfo = getVersionInfo();

        function getVersionInfo() {
            $ionicPlatform.ready(function() {
                if (window.cordova) {
                    $cordovaAppVersion.getVersionNumber().then(function(version) {
                        vm.appVersion = version;
                    });
                }
            });
        }
    });
