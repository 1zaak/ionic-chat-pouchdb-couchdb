'use strict';
angular.module('app.account')
    .controller('tncDialogCtrl', function($scope) {

        var vm = this;
        vm.close = close;

        function close() {
            $scope.closeModal(null);
        }
    });
