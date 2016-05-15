'use strict';
angular.module('app.home')
    .controller('categoryListCtrl', function(homeService) {
        var vm = this;
        vm.isLoading = false;
        vm.categories = [];

        //Methods
        vm.getData = getData();

        function getData() {
            vm.isLoading = true;
            homeService.getCategoryList().then(function(result) {
                vm.categories = result.Itemlist;
            });
            vm.isLoading = false;
        }
    });
