'use strict';
angular.module('app.home', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                abstract: true,
                views: {
                    'tab-home@app': {
                        templateUrl: 'modules/home/views/layout.html'
                    }
                }
            })
            .state('app.home.category_list', {
                url: '/category-list',
                views: {
                    'content@app.home': {
                        templateUrl: 'modules/home/views/category-list.html',
                        controller: 'categoryListCtrl as ctrl'
                    }
                }
            })
            .state('app.home.product_list', {
                url: '/category-list/:id?name',
                views: {
                    'content@app.home': {
                        templateUrl: 'modules/home/views/product-list.html',
                        controller: 'productListCtrl as ctrl'
                    }
                }

            });
    });
