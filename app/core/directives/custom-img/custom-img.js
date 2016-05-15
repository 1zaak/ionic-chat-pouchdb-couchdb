'use strict';
angular.module('app.core')
    .directive('customImg', function() {
        return {
            restrict: 'E',
            templateUrl: 'core/directives/custom-img/custom-img.html',
            scope: {
                thumbnail: '=',
                ratio: '='
            }
        };
    });
