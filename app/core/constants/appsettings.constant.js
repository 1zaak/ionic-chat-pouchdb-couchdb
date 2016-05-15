'use strict';
angular.module('app.core')
    .constant('AppSettings', {
        API_URL: 'http://api.dev.ecogiv.com/f1.0/',
        CDN: 'http://cdn.clux.asia/s3/ruizon/ecogiv',
        AUTH_EVENTS: {
            authenticated: 'auth-authenticated'
        },
        PAGE_EVENTS: {
            profileChanged: 'profile-changed'
        }
    });
