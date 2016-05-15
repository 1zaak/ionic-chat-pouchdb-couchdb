'use strict';
angular.module('app.account')
    .controller('loginCtrl', function(accountService, utilService) {
        var vm = this;
        vm.item = {};
        vm.availableCountries = accountService.getCountryList();

        vm.submit = submit;

        function submit(isValid) {
            if (isValid) {
                var data = {
                    username: vm.item.country.value + '-' + vm.item.mobile,
                    password: vm.item.password
                };

                utilService.showLoader();
                accountService.login(data).then(function(response) {
                    utilService.hideLoader();
                    accountService.broadcastSuccess(response);
                }, function(err) {
                    utilService.hideLoader();
                    utilService.showAlert('Oops!', err.ResponseStatus.Message);
                });

            } else {
                utilService.showAlert('Oops!', 'All fields are required!');
            }
        }
    });
