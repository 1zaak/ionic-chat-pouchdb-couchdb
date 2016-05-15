'use strict';
angular.module('app.home')
    .controller('productListCtrl', function(homeService, myModalService, $stateParams) {
        var vm = this;
        vm.isLoading = false;
        vm.products = [];
        vm.title = $stateParams.name;
        //Methods
        vm.showProductDetails = showProductDetails;
        vm.getData = getData();

        function showProductDetails(id) {
            myModalService.showProductDetailsDialog(id);
        }

        function getData() {
            vm.isLoading = true;
            homeService.getProductList().then(function(result) {
                vm.products = result.Itemlist;
            });
            vm.isLoading = false;
        }
    });
