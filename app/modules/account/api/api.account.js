'use strict';
angular
    .module('app.account')
    .factory('accountService', function($q, $http, $rootScope, AppSettings, localStorageService) {
        // all app modals here

        var service = {
            getCountryList: getCountryList,
            login: login,
            registration: registration,
            setRegistrationInfo: setRegistrationInfo,
            getRegistrationInfo: getRegistrationInfo,
            verify: verify,
            broadcastSuccess: broadcastSuccess
        };

        return service;

        function getCountryList() {
            var countries = [
                { name: 'Malaysia (+6)', value: 'MY' },
                { name: 'Singapore (+65)', value: 'SG' },
                { name: 'Thailand (+66)', value: 'TH' },
                { name: 'Indonesia (+62)', value: 'ID' }
            ];

            return countries;
        }

        function login(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'auth', data)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function registration(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'seller-registration', data)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function setRegistrationInfo(data) {
            localStorageService.setData('tmp_registrationinfo', data);
        }

        function getRegistrationInfo() {
            return localStorageService.getData('tmp_registrationinfo');
        }

        function verify(data) {
            var deferred = $q.defer();
            $http
                .post(AppSettings.API_URL + 'seller-registration-verification', data)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }

        function broadcastSuccess(data) {
            $rootScope.$broadcast(AppSettings.AUTH_EVENTS.authenticated, data);
        }
    });
