'use strict';
angular.module('app.core')
  .run(function($rootScope, $ionicPlatform, $cordovaStatusbar, localStorageService, authHelper, $ionicHistory, $location) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.disableScroll(true);
        $cordovaStatusbar.overlaysWebView(true); //eslint-disable-line no-undef
        $cordovaStatusBar.style(3); //eslint-disable-line no-undef
      }
    });

    if (!authHelper.hasUser()) {
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });

      // $location.path('/account/home');
      $location.path('/app/chat/chat-list');
    } else {
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });

      $location.path('/app/home/category-list');
    }
  })
  .run(function($rootScope, $http, authHelper, pouchDB) {
    var currentUser = 'es-1010';
    var localDb = pouchDB(currentUser);

    localDb.replicate.sync('https://couchdb-46fd58.smileupps.com/' + currentUser, {
      live: true
    })
      .on('change', function(info) {
        // handle change
        
        $rootScope.$broadcast('newChatEvent');
      });

    $rootScope.$on('$stateChangeStart', function() {
      if (authHelper.hasUser()) {
        $http.defaults.headers.common['X-ss-pid'] = authHelper.getSessionToken();
        $http.defaults.headers.common['X-ss-opt'] = 'perm';
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // console.log("Test");
         if (toState.name === 'app.chat.chat_list') {
            $rootScope.$broadcast('openedChatList');
         
        } else if (toState.name === 'app.chat.chat_detail') {
            $rootScope.$broadcast('openedChatDetail');
         
        }
    });
  });
