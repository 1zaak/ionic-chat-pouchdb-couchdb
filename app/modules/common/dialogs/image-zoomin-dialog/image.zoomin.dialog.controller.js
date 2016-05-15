  'use strict';
  angular.module('app.home')
      .controller('imgZoomInCtrl', function($scope, parameters) {
          var vm = this;
          vm.close = close;
          vm.img = parameters;

          //Methods
          function close() {
              $scope.closeModal(null);
          }
      });
