'use strict';
angular.module('app.core', [
        'ionic',
        'ngCordova',
        'ui.router',
        'ngCookies',
        'pascalprecht.translate',
        'ngMaterial',
        'ngLodash',
        'angularMoment',
        'LocalForageModule',
        'ionic-modal-select',
        'ngImgCrop',
        'keats.youtube',
        'ionic-toast',
        'ionic-fancy-select',
        'pouchdb',
        'ngLodash',
        'angularMoment'
        //'imagenie'
    ])
    .config(function($stateProvider) {

        // ROUTING with ui.router
        //$urlRouterProvider.otherwise('/app/me/dashboard');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                views: {
                    'main@': {
                        templateUrl: 'core/layout/main-layout.html',
                        controller: 'mainCtrl as ctrl'
                    }
                }
            })
            .state('account', {
                url: '/account',
                abstract: true,
                views: {
                    'main@': {
                        templateUrl: 'core/layout/account-layout.html'
                    }
                }
            });
    });
