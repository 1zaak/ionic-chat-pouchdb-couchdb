'use strict';
angular.module('app.core')
    .directive('customBg', function() {
        return {
            restrict: 'A',
            link: function(scope, $element) {
                var imgurl = scope.directive.item.CoverPic;
                var img = new Image();
                img.src = imgurl;
                img.onload = function() {
                    angular.element($element[0]).addClass('fade-in');
                    angular.element($element[0]).css('background', 'url(' + imgurl + ') no-repeat center center');
                    angular.element($element[0]).css('background-color', '#000');
                };
            }
        };
    });
