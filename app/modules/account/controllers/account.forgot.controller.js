'use strict';
angular.module('app.account')
    .controller('forgotCtrl', function() {
        var vm = this;
        vm.availableCountries = [
            { name: 'Malaysia (+60)', value: 'MY' },
            { name: 'Taiwan (+63)', value: 'TW' }
        ];
    });
