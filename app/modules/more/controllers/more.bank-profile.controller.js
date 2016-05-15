'use strict';
angular.module('app.more')
    .controller('bankProfileCtrl', function($scope, moreService, utilService) {
        var vm = this;
        vm.isLoading = false;
        vm.update = update;

        function update(isValid) {
            if (isValid) {
                var data = {
                    Data: vm.item
                };

                vm.isLoading = true;
                moreService.updateBankInfo(data).then(function(result) {
                    vm.isLoading = false;
                    if (result.Status === true) {
                        utilService.showToast('update successful', 'bottom');
                    }
                });
            }
        }

        function getProfileData() {
            vm.isLoading = true;
            moreService.getBankInfo().then(function(result) {
                vm.item = result;
                vm.isLoading = false;
            });
        }

        $scope.$on('$ionicView.loaded', function() {
            getProfileData();
        });
    });
