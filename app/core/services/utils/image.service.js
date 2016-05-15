'use strict';
angular.module('app.core')
    .factory('imageService', function($q, $cordovaCamera) {

        var service = {
            getPicture: getPicture
        };

        return service;

        function getPicture(options) {
            var q = $q.defer();

            $cordovaCamera.getPicture(options).then(function(result) {
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            });


            return q.promise;
        }
    });
