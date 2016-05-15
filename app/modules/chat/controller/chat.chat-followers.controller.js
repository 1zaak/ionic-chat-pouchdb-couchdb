'use strict';
angular.module('app.chat')
  .controller('chatFollowersCtrl', function(pouchDB) {
    var vm = this;
    var currentUser = 'es-1010';
    var followersListDb = 'followers-list';
    // var localDb = pouchDB(followersListDb);
    // var remoteDb = pouchDB('http://ecogiv.smileupps.com/'+ followersListDb);
    // console.log(remoteDb);
     var _initFollowersList = _initFollowersList;

    function _initFollowersList() {
      // vm.lists = [];
      // localDb.get(currentUser)
      //   .then(function(res) {
      //     vm.lists = [];
      //     var followers = res.followersList;
      //     console.log(followers);
      //     vm.lists = followers;
      //    followers = null;
          
      //   });
    }
    ;

     // _initFollowersList();

    localDb.replicate.sync(remoteDb, {
      live: true
    })
      .on('change', function(info) {
        // handle change
        
        // _initFollowersList();
      });
    
  });
