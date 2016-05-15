'use strict';
angular.module('app.more', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.more', {
                url: '/more',
                abstract: true,
                views: {
                    'tab-more@app': {
                        templateUrl: 'modules/more/views/layout.html'
                    }
                }
            })
            .state('app.more.home', {
                url: '/home',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/home.html',
                        controller: 'moreHomeCtrl as ctrl'
                    }
                }
            })
            .state('app.more.main_profile', {
                url: '/main-profile',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/main-profile.html',
                        controller: 'mainProfileCtrl as ctrl'
                    }
                }
            })
            .state('app.more.bank_profile', {
                url: '/bank-profile',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/bank-profile.html',
                        controller: 'bankProfileCtrl as ctrl'
                    }
                }
            })
            .state('app.more.shop_profile', {
                url: '/shop-profile',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/shop-profile.html',
                        controller: 'shopProfileCtrl as ctrl'
                    }
                }
            })
            .state('app.more.fbgroup_list', {
                url: '/fb-groups',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/fb-groups.html',
                        controller: 'fbGroupsCtrl as ctrl'
                    }
                }
            })
            .state('app.more.fbgroup_details', {
                url: '/fb-group-details/:id',
                views: {
                    'content@app.more': {
                        templateUrl: 'modules/more/views/fb-group-details.html',
                        controller: 'fbGroupDetailsCtrl as ctrl'
                    }
                }
            });
    });
