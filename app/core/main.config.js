'use strict';
angular.module('app.core')
    .config(function($translateProvider, $ionicConfigProvider, $mdGestureProvider, $mdThemingProvider, $compileProvider) {

        $mdThemingProvider.theme('dark')
            .primaryPalette('grey')
            .dark();

        $mdThemingProvider.theme('article')
            .primaryPalette('red')
            .accentPalette('yellow', {
                'default': '500'
            });

        $mdGestureProvider.skipClickHijack();
        $mdThemingProvider.alwaysWatchTheme(true);
        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.uniformLanguageTag('bcp47').determinePreferredLanguage(function() {
                var preferredLangKey = 'en';
                // some custom logic's going on in here
                preferredLangKey = window.navigator.language.split('-')[0];
                return preferredLangKey;
            })
            .fallbackLanguage('en')
            .useLocalStorage();

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.backButton.text('&nbsp;&nbsp;');
        $ionicConfigProvider.navBar.alignTitle('center');

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data|fbauth):/);
    });
