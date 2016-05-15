'use strict';
angular.module('app.account')
    .controller('privacyDialogCtrl', function($scope) {

        var vm = this;
        vm.close = close;

        function close() {
            $scope.closeModal(null);
        }
    });
