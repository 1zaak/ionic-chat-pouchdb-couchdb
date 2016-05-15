'use strict';
angular.module('app.more')
    .controller('fbGroupsCtrl', function($scope, moreService) {
        var vm = this;
        vm.isLoading = false;
        vm.groups = [];

        function getData() {
            vm.isLoading = true;
            moreService.getFBGroups().then(function(data) {
                vm.groups = data.Itemlist;
                vm.isLoading = false;
            });
        }

        $scope.$on('$ionicView.loaded', function() {
            getData();
        });
    });
