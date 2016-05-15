'use strict';
angular.module('app.chat')
  .controller('chatListCtrl', function($scope, chatService, myModalService, $stateParams, pouchDB, lodash, amMoment) {
    var vm = this;
    vm.isLoading = false;
    vm.title = $stateParams.name;
    var currentUser = 'es-1010';
    var localDb = pouchDB(currentUser);
    vm.lists = [];
    vm.unread = 1;

    var _initChatList = _initChatList;

    function _initChatList() {
      vm.lists = [];
      localDb.allDocs({
        include_docs: true
      })
        .then(function(res) {
          vm.lists = [];
          var details = res.rows;
          console.log(details);
          var mainChats = [];
          lodash(details).forEach(function(o) {
            var otherUserName = o.doc.name;
            var messageCounter = o.doc.messageCounter;
            var otherUserId = o.doc._id;
            messageCounter += 1;
            if (o.doc.chats.length > 0) {
              var chatItem = lodash.last(o.doc.chats);
              console.log(chatItem);
              vm.lists.push({
                id: otherUserId,
                name: otherUserName,
                messageCounter: messageCounter,
                lastMessage: chatItem.message,
                timestamp: chatItem.timestamp
              });
            } else if (o.doc.chats.length == 0) {
              vm.lists.push({
                id: otherUserId,
                name: otherUserName,
                messageCounter: messageCounter,
                lastMessage: undefined,
                timestamp: undefined
              });
            }

          });

          //cleanup
          details = null;
          mainChats = null;
        });
    }
    ;

    _initChatList();

    localDb.replicate.sync('https://couchdb-46fd58.smileupps.com/' + currentUser, {
      live: true
    })
      .on('change', function(info) {
        // handle change
        console.log(info);
        _initChatList();
      });

      $scope.$on('openedChatDetail', function(info){
        console.log("Opened chat detail");
      })

      //Methods
      // vm.showChatList = showChatList;
      // vm.getData = getData();

      // function showChatList(otherUserId) {
      //   myModalService.showChatListDialog(otherUserId);
      // }

  // function getData() {
  //   vm.isLoading = true;
  //   chatService.getChatList().then(function(result) {
  //     vm.lists = result.Chatlist;
  //   });
  //   vm.isLoading = false;
  // }
  });
