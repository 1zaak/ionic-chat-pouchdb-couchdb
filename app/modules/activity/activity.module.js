'use strict';
angular.module('app.activity', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.activity', {
                url: '/activity',
                abstract: true,
                views: {
                    'tab-activity@app': {
                        templateUrl: 'modules/activity/views/layout.html'
                    }
                }
            })
            .state('app.activity.list', {
                url: '/list',
                views: {
                    'content@app.activity': {
                        templateUrl: 'modules/activity/views/activity.list.html'
                    }
                }
            });
    });
