'use strict';
angular
    .module('app.core')
    .factory('authHelper', function($rootScope, $state, $ionicHistory) {
        // all app modals here

        var service = {
            hasUser: hasUser,
            hasUserDetails: hasUserDetails,
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            setAuthToken: setAuthToken,
            getAuthToken: getAuthToken,
            getCurrentRole: getCurrentRole,
            setCurrentRole: setCurrentRole,
            logout: logout,
            redirect: redirect,
            broadcastUnauthenticated: broadcastUnauthenticated
        };

        function hasUser() {
            var token = localStorage.getItem('AuthToken');
            if (token === undefined || token === null) {
                return false;
            } else {
                return true;
            }
        }

        function hasUserDetails() {
            var data = localStorage.getItem('UserDetails');
            if (data === undefined || data === null) {
                return false;
            } else {
                return true;
            }
        }

        function getSessionToken() {
            return JSON.parse(localStorage.getItem('SessionToken'));
        }

        function setSessionToken(data) {
            localStorage.setItem('SessionToken', JSON.stringify(data));
        }

        function setAuthToken(data) {
            localStorage.setItem('AuthToken', data);
        }

        function getAuthToken() {
            return localStorage.getItem('AuthToken');
        }

        function getCurrentRole() {
            return localStorage.getItem('CRole');
        }

        function setCurrentRole(data) {
            localStorage.setItem('CRole', data);
        }

        function logout() {
            localStorage.removeItem('AuthToken');
            localStorage.removeItem('SessionToken');
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            //CacheFactory.destroyAll();
        }

        function redirect() {
            $state.go('app.home.category_list');
        }

        function broadcastUnauthenticated() {
            window.location.href = 'account/login';
        }

        return service;


    });
