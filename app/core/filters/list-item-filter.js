'use strict';
angular.module('app.core')
    .filter('listitemfilter', function() {
        return function(d, type) {
            if (type === 'price' && d !== undefined) {
                return 'RM ' + d;
            } else if (type === 'percentage' && d !== undefined) {
                return d + '%';
            }
            return d;
        };
    });
