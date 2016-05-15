'use strict';
angular.module('app.home')
    .controller('productDetailsCtrl', function(homeService, $scope, myModalService, $stateParams) {

        var vm = this;
        vm.isLoading = false;
        vm.item = {};
        vm.title = $stateParams.name;
        vm.close = close;

        //Methods 
        vm.changeDisplayImage = changeDisplayImage;
        vm.showImageZoomIn = showImageZoomIn;
        vm.showSellerProfile = showSellerProfile;
        vm.getData = getData();

        function close() {
            $scope.closeModal(null);
        }

        function showImageZoomIn(url) {
            myModalService.showImageZoomInDialog(url);
        }

        function showSellerProfile(id) {
            myModalService.showSellerProfileDialog(id);
        }

        function changeDisplayImage(img) {
            console.log(img);
            vm.Thumbnail = img.Url;
            //change this image to selected
            angular.forEach(vm.item.Imagelist, function(x) {
                if (x === img) {
                    x.Selected = true;
                } else {
                    x.Selected = false;
                }
            });
        }

        function getData() {
            vm.isLoading = true;
            homeService.getProductDetails().then(function(result) {
                vm.item = result.Item;
                vm.Thumbnail = result.Item.Thumbnail;
            });
            vm.isLoading = false;
        }
    });
