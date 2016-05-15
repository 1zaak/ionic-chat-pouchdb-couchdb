'use strict';
angular.module('app.core')
    .directive('msModalNumpad', function() {

        function msModalNumpadCtrl($scope, myModalService) {
            var vm = this;

            $scope.$watch('value', function(nv) {
                vm.value = nv;
            });

            $scope.$watch('placeholder', function(nv) {
                vm.placeholder = nv;
            });

            $scope.$watch('type', function(nv) {
                vm.type = nv;
            });

            $scope.$watch('note', function(nv) {
                vm.note = nv;
            });

            vm.showInputModal = showInputModal;

            function showInputModal() {
                var o = {
                    value: $scope.value,
                    placeholder: $scope.placeholder,
                    type: $scope.type
                };

                myModalService.showNumberBoxModal(o).then(function(data) {
                    resolveResult(data);
                });
            }

            function resolveResult(data) {
                if (data !== null) {
                    $scope.update({
                        result: {
                            field: $scope.placeholder,
                            value: data
                        }
                    });
                }
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'core/directives/ms-modal-numpad/list-item.html',
            scope: {
                icon: '=',
                value: '=',
                type: '=',
                placeholder: '=',
                note: '=',
                update: '&'
            },
            controller: msModalNumpadCtrl,
            controllerAs: 'dialog'
        };
    });
