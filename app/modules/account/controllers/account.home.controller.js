'use strict';
angular.module('app.account')
    .controller('accountHomeCtrl', function(myModalService) {
        var vm = this;
        vm.showTNCDialog = showTNCDialog;
        vm.showPrivacyDialog = showPrivacyDialog;

        function showTNCDialog() {
            myModalService.showTNCDialog();
        }

        function showPrivacyDialog() {
            myModalService.showPrivacyDialog();
        }
    });
