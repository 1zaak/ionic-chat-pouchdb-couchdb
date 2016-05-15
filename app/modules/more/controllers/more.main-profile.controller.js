'use strict';
angular.module('app.more')
    .controller('mainProfileCtrl', function($scope, AppSettings, myModalService, moreService, utilService) {
        var vm = this;
        vm.item = {};
        vm.isLoading = false;

        //Methods

        vm.changeProfilePic = changeProfilePic;
        vm.changeCoverPic = changeCoverPic;
        vm.requestICVerification = requestICVerification;
        vm.partialUpdate = partialUpdate;

        function changeProfilePic() {
            var profileOption = {
                quality: 80,
                width: 200,
                height: 200
            };
            myModalService.showImageHelperDialog(profileOption).then(function(result) {
                if (result !== null) {
                    vm.item.ProfilePic = result;
                    var data = {
                        Propname: 'ProfilePic',
                        Propvalue: result
                    };
                    moreService.amendProfile(data).then(function(r) {
                        if (r.Status) {
                            moreService.broadcastProfileChange();
                        }
                    });
                }
            });
        }

        function changeCoverPic() {
            var coverOption = {
                quality: 80,
                width: 1650,
                height: 1000
            };
            myModalService.showImageHelperDialog(coverOption).then(function(result) {
                if (result !== null) {
                    vm.item.CoverPic = result;
                    var data = {
                        Propname: 'CoverPic',
                        Propvalue: result
                    };
                    moreService.amendProfile(data).then(function(r) {
                        if (r.Status) {
                            moreService.broadcastProfileChange();
                        }
                    });
                }
            });
        }

        function requestICVerification() {
            if (vm.item.ICVerified === 0) {
                var imgOption = {
                    quality: 80,
                    width: 600,
                    height: 850,
                    hasInstruction: true,
                    instructionVideoID: 'vX-s2Hn61Gg'
                };
                myModalService.showImageHelperDialog(imgOption).then(function(result) {
                    if (result !== null) {
                        vm.isLoading = true;
                        var data = {
                            VerificationType: 'seller-ic-verification',
                            FileLink: result
                        };
                        moreService.requestVerification(data).then(function(r) {
                            vm.isLoading = false;
                            if (r.Status) {
                                vm.item.ICVerified = 1;
                                utilService.showToast('Your IC will be verified and approved within 2-3 working days!', 'bottom');
                            }
                        });
                    }

                });
            }
        }


        function partialUpdate(result) {
            var ov;
            if (result.field === 'Fullname') {
                ov = vm.item.Fullname;
                if (ov !== result.value) {
                    vm.item.Fullname = result.value;
                    processChanges(ov, result);

                }
            } else if (result.field === 'Email Address') {
                ov = vm.item.Email;
                if (ov !== result.value) {
                    vm.item.Email = result.value;
                    processChanges(ov, result);

                }
            }
        }

        function getProfileData() {
            vm.isLoading = true;
            moreService.getEditableProfile().then(function(result) {
                result.ProfilePic = AppSettings.CDN + '/profile-pics/' + result.ProfilePic;
                result.CoverPic = AppSettings.CDN + '/cover-pics/' + result.CoverPic;
                vm.item = result;
                vm.isLoading = false;
            });
        }

        function processChanges(ov, result) {
            var data = {
                Propname: result.field,
                Propvalue: result.value
            };
            moreService.amendProfile(data).then(function(r) {
                if (r.Status) {
                    moreService.broadcastProfileChange();
                }
            });
        }

        $scope.$on('$ionicView.loaded', function() {
            getProfileData();
        });
    });
