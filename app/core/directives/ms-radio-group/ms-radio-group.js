'use strict';
angular.module('app.core')
    .directive('msRadioGroup', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                value: '=msRadioGroup'
            },
            link: function(scope, element, attrs, ngModelCtrl) {
                element.addClass('button');
                element.on('click', function() {
                    scope.$apply(function() {
                        ngModelCtrl.$setViewValue(scope.value);
                    });
                });

                scope.$watch('model', function(newVal) {
                    element.removeClass('button-balanced');
                    if (newVal === scope.value) {
                        element.addClass('button-balanced');
                    }
                });
            }
        };
    });
