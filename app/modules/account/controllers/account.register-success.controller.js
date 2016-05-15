'use strict';
angular.module('app.account')
    .controller('registerSuccessCtrl', function(accountService, $stateParams, utilService, $timeout) {
        var vm = this;
        vm.item = {
            UserNo: $stateParams.id
        };

        accountService.getRegistrationInfo().then(function(result) {
            var user = result;
            var data = {
                username: user.Country + '-' + user.Mobile,
                password: user.Password
            };

            utilService.showLoader();
            accountService.login(data).then(function(response) {
                utilService.hideLoader();
                $timeout(function() {
                    accountService.broadcastSuccess(response);
                }, 3000);
            }, function(err) {
                utilService.hideLoader();
                utilService.showAlert('Oops!', err.ResponseStatus.Message);
            });
        });
    });
