 'use strict';
 angular.module('app.home')
     .controller('sellerProfileCtrl', function(homeService, $scope, myModalService, $stateParams) {

         var vm = this;
         vm.isLoading = false;
         vm.item = [];
         vm.title = $stateParams.name;
         vm.close = close;

         //Methods
         vm.getData = getData();

         function close() {
             $scope.closeModal(null);
         }

         function getData() {
             vm.isLoading = true;
             homeService.getSellerDetails().then(function(result) {
                 vm.item = result.Item;

             });
             vm.isLoading = false;
         }
     });
