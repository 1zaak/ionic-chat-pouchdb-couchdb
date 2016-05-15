'use strict';
angular
    .module('app.core')
    .factory('localStorageService', function($localForage) {

        var service = {
            setData: setData,
            getData: getData
        };

        return service;


        function setData(key, data) {
            $localForage.setItem(key, data);
        }

        function getData(key) {
            return $localForage.getItem(key);
        }
    });
