'use strict';
angular.module('app.core')
    .factory('myModalService', function(appModalService) {
        // all app modals here
        var service = {
            showTNCDialog: showTNCDialog,
            showPrivacyDialog: showPrivacyDialog,
            showImageHelperDialog: showImageHelperDialog,
            showTextBoxModal: showTextBoxModal,
            showEmailBoxModal: showEmailBoxModal,
            showTextAreaBoxModal: showTextAreaBoxModal,
            showNumberBoxModal: showNumberBoxModal,
            showTagBoxModal: showTagBoxModal,
            showProductDetailsDialog: showProductDetailsDialog,
            showImageZoomInDialog: showImageZoomInDialog,
            showSellerProfileDialog: showSellerProfileDialog,
            showChatListDialog: showChatListDialog
        };

        return service;

        function showTNCDialog() {
            return appModalService.show('modules/account/views/dialogs/_tnc.html', 'tncDialogCtrl as modalCtrl');
        }

        function showPrivacyDialog() {
            return appModalService.show('modules/account/views/dialogs/_privacy.html', 'privacyDialogCtrl as modalCtrl');
        }

        function showImageHelperDialog(options) {
            return appModalService.show('modules/common/dialogs/image-helper-dialog/_image-helper-dialog.html', 'imageHelperDialogCtrl as modalCtrl', options);
        }

        function showTextBoxModal(cObject) {
            return appModalService.show('core/directives/ms-modal-textbox/_modal-textbox.html', 'msModalTextBoxCtrl as modalCtrl', cObject, {
                animation: 'modal-slide-left'
            });
        }

        function showEmailBoxModal(cObject) {
            return appModalService.show('core/directives/ms-modal-textbox/_modal-emailbox.html', 'msModalTextBoxCtrl as modalCtrl', cObject, {
                animation: 'modal-slide-left'
            });
        }

        function showTextAreaBoxModal(cObject) {
            return appModalService.show('core/directives/ms-modal-textbox/_modal-textareabox.html', 'msModalTextBoxCtrl as modalCtrl', cObject, {
                animation: 'modal-slide-left'
            });
        }

        function showNumberBoxModal(cObject) {
            return appModalService.show('core/directives/ms-modal-numpad/_modal-numberbox.html', 'msModalNumberBoxCtrl as modalCtrl', cObject, {
                animation: 'modal-slide-left'
            });
        }

        function showTagBoxModal(cObject) {
            return appModalService.show('core/directives/ms-modal-tag/_modal-tagbox.html', 'msModalTagBoxCtrl as modalCtrl', cObject, {
                animation: 'modal-slide-left'
            });
        }

        function showProductDetailsDialog(id) {
            return appModalService.show('modules/home/views/dialogs/_product.html', 'productDetailsCtrl as modalCtrl', id);
        }

        function showImageZoomInDialog(url) {
            return appModalService.show('modules/common/dialogs/image-zoomin-dialog/_image-zoomin-dialog.html', 'imgZoomInCtrl as modalCtrl', url);
        }

        function showSellerProfileDialog(id) {
            return appModalService.show('modules/home/views/dialogs/_sellerProfile.html', 'sellerProfileCtrl as modalCtrl', id);

        }

         function showChatListDialog(id) {
            return appModalService.show('modules/chat/views/dialogs/_chatDetails.html', 'chatDetailsCtrl as modalCtrl', id);

        }

    });
