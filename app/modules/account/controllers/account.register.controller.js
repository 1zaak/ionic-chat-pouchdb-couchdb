'use strict';
angular.module('app.account')
    .controller('registerCtrl', function(accountService, utilService) {
        var vm = this;
        vm.item = {};
        vm.availableCountries = accountService.getCountryList();

        vm.submit = submit;

        function submit(isValid) {
            if (isValid) {
                var data = {
                    Country: vm.item.country.value,
                    Mobile: vm.item.mobile,
                    FullName: vm.item.fullname,
                    Email: vm.item.email,
                    Password: vm.item.password
                };

                utilService.showLoader();
                accountService.registration(data).then(function(response) {
                    utilService.hideLoader();
                    if (response.Status === true) {
                        accountService.setRegistrationInfo(data);
                        utilService.go('account.verify', { id: response.StatusText });
                    } else {
                        utilService.showAlert('Oops!', response.StatusText);
                    }
                });

            } else {
                utilService.showAlert('Oops!', 'All fields are required!');
            }
        }
    });
