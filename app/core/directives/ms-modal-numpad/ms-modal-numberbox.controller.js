'use strict';
angular.module('app.core')
    .controller('msModalNumberBoxCtrl', function($scope, parameters) {
        var vm = this;
        vm.cObject = parameters;
        vm.displayValue = '';

        //methods
        vm.add = add;
        vm.remove = remove;
        vm.submit = submit;
        vm.close = close;


        //Functions
        function add(val) {
            vm.displayValue += val;
        }

        function remove() {
            vm.displayValue = vm.displayValue.substr(0, vm.displayValue.length - 1);
        }

        function submit() {
            var result = parseFloat(vm.displayValue);
            if (!isNaN(result)) {
                vm.cObject.value = result;
                $scope.closeModal(vm.cObject.value);
            } else {
                $scope.closeModal(0);
            }
        }

        function close() {
            $scope.closeModal(null);
        }
    });
