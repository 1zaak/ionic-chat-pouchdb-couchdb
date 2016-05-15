// 'use strict';
// angular.module('app.core')
//   .factory('chatService', function($q, pouchDB) {

//     var service = {
//       getChats: getChats
//     };

//     return service;

//     function getChats(otherUserId) {
//       var currentUser = 'es-1010';
//       var localDb = pouchDB(currentUser);
//       var q = $q.defer();

//       localDb.get(otherUserId).then(function(doc) {
//         // handle doc
//         console.log(doc)
//       }).catch(function(err) {
//         console.log(err);
//       });
//       return q.promise;
//     }

//     function getChatDetails(currentUserId, otherUserId) {
//       var localDb = pouchDB(currentUserId);

//       var _initChatDetail = _initChatDetail;

//       function _initChatDetail() {
//         localDb.get(otherUserId)
//           .then(function(res) {
//             console.log(res);

//           });
//       }

      

//       localDb.replicate.sync('https://couchdb-ccbd79.smileupps.com/' + currentUser, {
//         live: true
//       }).on('change', function(info) {
//         // handle change
//         console.log(info);
//         $
//       });
//     }

//   });
