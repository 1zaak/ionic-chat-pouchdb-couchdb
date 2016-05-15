'use strict';
angular.module('app.core')
    .directive('msModalTag', function() {

        function msModalTagCtrl($scope, myModalService) {
            var vm = this;
            vm.value = [];

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

                myModalService.showTagBoxModal(o).then(function(data) {
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
            templateUrl: 'core/directives/ms-modal-tag/list-item.html',
            scope: {
                icon: '=',
                value: '=',
                type: '=',
                placeholder: '=',
                note: '=',
                update: '&'
            },
            controller: msModalTagCtrl,
            controllerAs: 'dialog'
        };
    });
