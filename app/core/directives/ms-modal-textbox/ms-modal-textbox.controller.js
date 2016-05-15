'use strict';
angular.module('app.core')
    .controller('msModalTextBoxCtrl', function($scope, parameters) {
        var vm = this;
        vm.cObject = parameters;
        //methods
        vm.submit = submit;
        vm.close = close;


        //Functions
        function submit(isValid) {
            if (isValid) {
                $scope.closeModal(vm.cObject.value);
            }
        }

        function close() {
            $scope.closeModal(null);
        }
    });
