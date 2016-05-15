'use strict';
angular.module('app.more')
    .controller('fbGroupDetailsCtrl', function($scope, moreService, $stateParams) {
        var vm = this;
        vm.isLoading = false;
        vm.group = {};

        //Methods
        vm.joinnow = joinnow;

        function joinnow() {
            var data = {
                GroupID: $stateParams.id
            };

            moreService.joinFBGroup(data).then(function(result) {
                if (result.Status === true) {
                    vm.group.IsMember = 1;
                }
            });
        }

        function getData() {
            vm.isLoading = true;
            moreService.getFBGroup($stateParams.id).then(function(data) {
                vm.group = data.Item;
                vm.isLoading = false;
            });
        }

        $scope.$on('$ionicView.loaded', function() {
            getData();
        });
    });
