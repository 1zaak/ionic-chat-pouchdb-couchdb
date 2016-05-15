'use strict';
angular.module('app.chat', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('app.chat', {
                url: '/chat',
                abstract: true,
                views: {
                    'tab-chat@app': {
                        templateUrl: 'modules/chat/views/layout.html'
                    }
                }
            })

        .state('app.chat.chat_list', {
            url: '/chat-list',
            views: {
                'content@app.chat': {
                    templateUrl: 'modules/chat/views/chat-list.html',
                        controller: 'chatListCtrl as ctrl'
                  }
                }
            })


        .state('app.chat.chat_details', {
            url: '/chat-details/:otherUserId/:otherUsername',
            views: {
                'content@app.chat': {
                    templateUrl: 'modules/chat/views/chat-details.html',
                        controller: 'chatDetailsCtrl as ctrl'
                }
            }

        })

          .state('app.chat.followers', {
            url: '/followers/',
            views: {
                'content@app.chat': {
                    templateUrl: 'modules/chat/views/chat-followers.html',
                        controller: 'chatFollowersCtrl as ctrl'
                }
            }

        });
    });
