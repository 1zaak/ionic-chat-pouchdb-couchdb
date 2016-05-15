'use strict';
angular.module('app.core')
    .directive('lazyScroll', ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                link: function($scope) {
                    var origEvent = $scope.$onScroll;
                    $scope.$onScroll = function() {
                        $rootScope.$broadcast('lazyScrollEvent');

                        if (typeof origEvent === 'function') {
                            origEvent();
                        }
                    };
                }
            };
        }
    ])

.directive('imageLazySrc', ['$document', '$timeout', '$ionicScrollDelegate', '$compile',
    function($document, $timeout, $ionicScrollDelegate, $compile) {
        return {
            restrict: 'A',
            scope: {
                lazyScrollResize: '@lazyScrollResize',
                imageLazyBackgroundImage: '@imageLazyBackgroundImage',
                imageLazySrc: '@'
            },
            link: function($scope, $element, $attributes) {
                if (!$attributes.imageLazyDistanceFromBottomToLoad) {
                    $attributes.imageLazyDistanceFromBottomToLoad = 0;
                }
                if (!$attributes.imageLazyDistanceFromRightToLoad) {
                    $attributes.imageLazyDistanceFromRightToLoad = 0;
                }

                var loader;
                if ($attributes.imageLazyLoader) {
                    loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader" icon="' + $attributes.imageLazyLoader + '"></ion-spinner></div>')($scope);
                    $element.after(loader);
                }

                $scope.$watch('imageLazySrc', function() {
                    if (loader) {
                        loader.remove();
                    }
                    if ($attributes.imageLazyLoader) {
                        loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader" icon="' + $attributes.imageLazyLoader + '"></ion-spinner></div>')($scope);
                        $element.after(loader);
                    }
                    var deregistration = $scope.$on('lazyScrollEvent', function() {
                        //    console.log('scroll');
                        if (isInView()) {
                            loadImage();
                            deregistration();
                        }
                    });
                    $timeout(function() {
                        if (isInView()) {
                            loadImage();
                            deregistration();
                        }
                    }, 500);
                });
                var deregistration = $scope.$on('lazyScrollEvent', function() {
                    // console.log('scroll');
                    if (isInView()) {
                        loadImage();
                        deregistration();
                    }
                });

                function loadImage() {
                    //Bind "load" event
                    $element.bind('load', function() {
                        if ($attributes.imageLazyLoader) {
                            loader.remove();
                        }
                        if ($scope.lazyScrollResize === 'true') {
                            //Call the resize to recalculate the size of the screen
                            $ionicScrollDelegate.resize();
                        }
                        $element.unbind('load');
                    });

                    if ($scope.imageLazyBackgroundImage === 'true') {
                        var bgImg = new Image();
                        bgImg.onload = function() {
                            if ($attributes.imageLazyLoader) {
                                loader.remove();
                            }
                            $element[0].style.backgroundImage = 'url(' + $attributes.imageLazySrc + ')'; // set style attribute on element (it will load image)
                            if ($scope.lazyScrollResize === 'true') {
                                //Call the resize to recalculate the size of the screen
                                $ionicScrollDelegate.resize();
                            }
                        };
                        bgImg.src = $attributes.imageLazySrc;
                    } else {
                        var img = new Image();
                        img.src = $attributes.imageLazySrc;
                        //$element[0].src = $attributes.imageLazySrc; // set src attribute on element (it will load image)
                        img.onload = function() {
                            $element[0].src = img.src; // set src attribute on element (it will load image)
                        };
                    }
                }

                function isInView() {
                    var clientHeight = $document[0].documentElement.clientHeight;
                    var clientWidth = $document[0].documentElement.clientWidth;
                    var imageRect = $element[0].getBoundingClientRect();
                    return (imageRect.top >= 0 && imageRect.top <= clientHeight + parseInt($attributes.imageLazyDistanceFromBottomToLoad)) && (imageRect.left >= 0 && imageRect.left <= clientWidth + parseInt($attributes.imageLazyDistanceFromRightToLoad));
                }

                // bind listener
                // listenerRemover = scrollAndResizeListener.bindListener(isInView);

                // unbind event listeners if element was destroyed
                // it happens when you change view, etc
                $element.on('$destroy', function() {
                    deregistration();
                });

                // explicitly call scroll listener (because, some images are in viewport already and we haven't scrolled yet)
                $timeout(function() {
                    if (isInView()) {
                        loadImage();
                        deregistration();
                    }
                }, 500);
            }
        };
    }
]);
