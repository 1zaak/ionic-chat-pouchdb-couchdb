'use strict';
angular.module('app.chat')
  .controller('chatDetailsCtrl', function(chatService, $scope, $state, pouchDB) {
    var vm = this;

    vm.close = close;
    vm.details = [];
    // vm.getData = getData();
    var user = 'es-1010'; //Current Ecogiv userId
    var username = 'Izaak' //Current Ecogiv username
    var other = $state.params.otherUserId; //The other user
    var otherUsername = $state.params.otherUsername; //The other user's username

    var db = pouchDB(user);
    db.get(other).then(function(doc) {
      // handle doc
      console.log(doc);
      vm.details = doc.chats;
      
    }).catch(function(err) {
      console.log(err);
      if (err) {
        db.put({
          'profilePic': '',
          'chats': lastMsgs,
          '_id': other,
          'name': otherUsername,
          'messageCounter': 0,
          'chats': []
        }).then(function(response) {
          // handle response
          document.getElementById('newMessage').value = '';
        }).catch(function(err) {});

      }
    });

    $scope.online = true;
    if ($scope.online) {
      $scope.sync = db.replicate.sync('https://couchdb-46fd58.smileupps.com/'+ user, {
        live: true
      })
        .on('change', function(info) {
          db.get(other).then(function(doc) {
            // handle doc
            vm.details = [];
            vm.details = doc.chats;
            console.log(doc.chats)
          }).catch(function(err) {});

        });
    } else {

      $scope.sync.cancel();
    }

    vm.testClick = function() {
      var cMsg = document.getElementById('newMessage').value;

      var date = Math.round(+new Date() / 1000); //convert to unixTime
      var otherDb = pouchDB('https://admin:684255f17a8e@couchdb-46fd58.smileupps.com/' + other);
      console.log(otherDb);
      db.get(other).then(function(doc) {

        var chats = doc.chats;
        console.log(chats);
        var lastMsgs = [];
        lastMsgs = chats;
        var newMsgObj = {
          'name': username,
          'type': 'self',
          'message': cMsg,
          'timestamp': date
        };

        lastMsgs.push(newMsgObj);
        // handle doc
        db.put({
          '_id': doc._id,
          '_rev': doc._rev,
          'name': doc.name,
          'messageCounter': 0,
          'profilePic': doc.profilePic,
          'chats': lastMsgs
        }).then(function(response) {
          // handle response
          document.getElementById('newMessage').value = '';
        }).catch(function(err) {});

        
        otherDb.get(user).then(function(userDoc) {
          var chats = userDoc.chats;
          
          var lastMsgs = [];
          lastMsgs = chats;
          var newMsgObj = {
            'name': username,
            'type': 'other',
            'message': cMsg,
            'timestamp': date
          }.catch(function(err) {
            console.log(err);

          });

          lastMsgs.push(newMsgObj);

          // handle doc

          otherDb.put({
            '_id': userDoc._id,
            '_rev': userDoc._rev,
            'name': userDoc.name,
            'messageCounter': 0,
            'profilePic': userDoc.profilePic,
            'chats': lastMsgs
          }).then(function(response) {
            // handle response
            document.getElementById('newMessage').value = '';
          }).catch(function(err) {});
        }).catch(function(err) {
          console.log(err);
          if (err) {
            otherDb.put({
              '_id': user,
              'name': username,
              'messageCounter': 0,
              'profilePic': '',
              'chats': lastMsgs
            }).then(function(response) {
              // handle response
              document.getElementById('newMessage').value = '';
            }).catch(function(err) {});

          }
        });

      }).catch(function(err) {});

    };
  });
