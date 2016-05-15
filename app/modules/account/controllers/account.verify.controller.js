'use strict';
angular.module('app.account')
    .controller('verifyCtrl', function(accountService, utilService, $stateParams) {
        var vm = this;
        vm.item = {};
        vm.submit = submit;

        function submit(isValid) {
            if (isValid) {
                var data = {
                    UserID: $stateParams.id,
                    VerificationCode: vm.item.code
                };

                utilService.showLoader();
                accountService.verify(data).then(function(response) {
                    utilService.hideLoader();
                    utilService.go('account.registration_sucessful', { id: response.StatusText });
                }, function(err) {
                    utilService.hideLoader();
                    utilService.showAlert('Oops!', err.StatusText);
                });

            } else {
                utilService.showAlert('Oops!', 'All fields are required!');
            }
        }

    });
