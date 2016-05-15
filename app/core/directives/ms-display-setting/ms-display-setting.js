'use strict';
angular.module('app.core')
    .directive('msDisplaySetting', function() {
        function msDisplaySettingCtrl($scope, $ionicPopup) {
            var vm = this;
            vm.showSetting = showSetting;

            function showSetting() {
                $ionicPopup.show({
                    templateUrl: 'modules/article/views/dialogs/article.popup.html',
                    title: '设置',
                    scope: $scope.data,
                    buttons: [
                        { text: '确定' }
                    ]
                });
            }
        }

        return {
            restrict: 'E',
            controller: msDisplaySettingCtrl,
            controllerAs: 'directive',
            scope: {
                data: '='
            },
            templateUrl: 'core/directives/ms-display-setting/ms-display-setting.html'
        };
    });
