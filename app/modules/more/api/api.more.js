'use strict';
angular
    .module('app.more')
    .factory('moreService', function($q, $http, $rootScope, AppSettings) {
        // all app modals here

        var service = {
            getEditableProfile: getEditableProfile,
            amendProfile: amendProfile,
            requestVerification: requestVerification,
            getBankInfo: getBankInfo,
            updateBankInfo: updateBankInfo,
            getShopInfo: getShopInfo,
            updateShopInfo: updateShopInfo,
            broadcastProfileChange: broadcastProfileChange,
            getFBGroups: getFBGroups,
            getFBGroup: getFBGroup,
            joinFBGroup: joinFBGroup
        };

        return service;

        function getEditableProfile() {
            var deferred = $q.defer();
            $http
                .get(AppSettings.API_URL + 'seller-profile-editable')
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function amendProfile(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'amend-profile', data)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function requestVerification(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'seller-verification', data)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function getBankInfo() {
            var deferred = $q.defer();
            $http
                .get(AppSettings.API_URL + 'seller-bank')
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function updateBankInfo(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'seller-bank', data)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function getShopInfo() {
            var deferred = $q.defer();
            $http
                .get(AppSettings.API_URL + 'seller-shop')
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function updateShopInfo(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'seller-shop', data)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function broadcastProfileChange(data) {
            $rootScope.$broadcast(AppSettings.PAGE_EVENTS.profileChanged, data);
        }

        function getFBGroups() {
            var deferred = $q.defer();
            $http
                .get(AppSettings.API_URL + 'fb-group-list')
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function getFBGroup(id) {
            var deferred = $q.defer();
            $http
                .get(AppSettings.API_URL + 'fb-group-details/' + id)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }

        function joinFBGroup(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'fb-group-join/', data)
                .success(deferred.resolve)
                .error(deferred.reject);
            return deferred.promise;
        }
    });
