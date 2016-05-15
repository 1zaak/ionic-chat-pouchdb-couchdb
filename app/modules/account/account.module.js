'use strict';
angular.module('app.account', [])
    .config(function($stateProvider, $translatePartialLoaderProvider) {
        $stateProvider
            .state('account.home', {
                url: '/home',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/home.html',
                        controller: 'accountHomeCtrl as ctrl'
                    }
                }
            })
            .state('account.login', {
                url: '/login',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/login.html',
                        controller: 'loginCtrl as ctrl'
                    }
                }
            })
            .state('account.register', {
                url: '/register',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/register.html',
                        controller: 'registerCtrl as ctrl'
                    }
                }
            })
            .state('account.registration_sucessful', {
                url: '/registration-sucessful/:id',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/registration_sucessful.html',
                        controller: 'registerSuccessCtrl as ctrl'
                    }
                }
            })
            .state('account.verify', {
                url: '/verify/:id',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/verify.html',
                        controller: 'verifyCtrl as ctrl'
                    }
                }
            })
            .state('account.forgot', {
                url: '/forgot',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/forgot.html',
                        controller: 'forgotCtrl as ctrl'
                    }
                }
            })
            .state('account.resetpassword', {
                url: '/reset-password',
                views: {
                    'account-view@account': {
                        templateUrl: 'modules/account/views/reset-password.html',
                        controller: 'resetPasswordCtrl as ctrl'
                    }
                }
            });

        $translatePartialLoaderProvider.addPart('modules/account');
    });
