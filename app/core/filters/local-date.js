'use strict';
angular.module('app.core')
    .filter('toLocalDate', function(moment) {
        return function(d) {
            return moment.unix(d).format('DD-MMM-YYYY');
        };
    })
    .filter('toLocalShortDate', function(moment) {
        return function(d) {
            return moment.unix(d).format('DD/MM/YYYY');
        };
    });
