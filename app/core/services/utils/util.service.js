'use strict';
angular.module('app.core')
    .service('utilService', function($rootScope, $q, $ionicPopup, $ionicLoading, $state, ionicToast) {

        var api = {
            go: go,
            showAlert: showAlert,
            showConfirmDialog: showConfirmDialog,
            showToast: showToast,
            showSuccess: showSuccess,
            showLoader: showLoader,
            hideLoader: hideLoader,
            broadcastScrollComplete: broadcastScrollComplete,
            broadcastInfiniteScrollComplete: broadcastInfiniteScrollComplete,
            broadcastProductUpdated: broadcastProductUpdated,
            toDataUrl: toDataUrl
        };

        return api;

        function go(param1, param2) {
            if (param2 === undefined) {
                $state.go(param1);
            } else {
                var s = JSON.parse(JSON.stringify(param2));
                $state.go(param1, s);
            }
        }

        function showAlert(title, text) {
            var popup = $ionicPopup.alert({
                title: title,
                template: text
            });
            return popup;
        }

        function showConfirmDialog(title, text) {
            var popup = $ionicPopup.confirm({
                title: title,
                template: text
            });
            return popup;
        }

        function showToast(text, position) {
            ionicToast.show(text, position, false, 3000);
        }

        function showSuccess() {
            var popup = $ionicPopup.alert({
                title: 'Oh Yeah!',
                template: '<div class="text-center"><img src="core/assets/images/account/check_icon.png"></div>'
            });
            return popup;
        }

        function showLoader() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        }

        function hideLoader() {
            $ionicLoading.hide();
        }

        function broadcastScrollComplete(scope) {
            scope.$broadcast('scroll.refreshComplete');
        }

        function broadcastInfiniteScrollComplete(scope) {
            scope.$broadcast('scroll.infiniteScrollComplete');
        }

        function broadcastProductUpdated() {
            $rootScope.$broadcast('productlist.updated');
        }

        function toDataUrl(url) {
            var q = $q.defer();
            var img = new Image();
            img.crossOrigin = '';
            img.onload = function() {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL('image/png');
                canvas = null;
                q.resolve(dataURL);
            };
            img.src = url;
            return q.promise;
        }
    });
