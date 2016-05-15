'use strict';
angular.module('app.more')
    .controller('shopProfileCtrl', function($scope, moreService, utilService, myModalService) {
        var vm = this;
        vm.isLoading = false;
        vm.requestROCVerification = requestROCVerification;
        vm.update = update;

        function requestROCVerification() {
            var imgOption = {
                quality: 80,
                width: 600,
                height: 850
            };
            myModalService.showImageHelperDialog(imgOption).then(function(result) {
                if (result !== null) {
                    vm.isLoading = true;
                    var data = {
                        VerificationType: 'seller-roc-verification',
                        FileLink: result
                    };
                    moreService.requestVerification(data).then(function(r) {
                        vm.isLoading = false;
                        if (r.Status) {
                            vm.item.ROCVerified = 'requested';
                            utilService.showToast('Your ROC will be verified and approved within 2-3 working days!', 'bottom');
                        }
                    });
                }

            });
        }

        function update() {
            var data = {
                Data: vm.item
            };
            vm.isLoading = true;
            moreService.updateShopInfo(data).then(function(result) {
                vm.isLoading = false;
                if (result.Status === true) {
                    utilService.showToast('update successful', 'bottom');
                }
            });
        }

        function getProfileData() {
            vm.isLoading = true;
            moreService.getShopInfo().then(function(result) {
                vm.item = result;
                vm.isLoading = false;
            });
        }

        $scope.$on('$ionicView.loaded', function() {
            getProfileData();
        });
    });
