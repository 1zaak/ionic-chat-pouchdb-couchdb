'use strict';
angular.module('app.core')
    .directive('msViewPassword', function() {
        return {
            restrict: 'A',
            link: function($scope, elem) {
                elem.on('click', function() {
                    var tb = elem.parent().children()[1];

                    var attr = angular.element(tb).attr('type');

                    if (attr === 'password') {
                        angular.element(tb).attr('type', 'text');
                        elem.removeClass('zmdi-eye');
                        elem.addClass('zmdi-eye-off');
                    } else {
                        angular.element(tb).attr('type', 'password');
                        elem.removeClass('zmdi-eye-off');
                        elem.addClass('zmdi-eye');
                    }
                });
            }
        };
    });
