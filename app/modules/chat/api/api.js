'use strict';
angular
    .module('app.chat')
    .factory('chatService', function($q) {
        // all app modals here

        var service = {
            getChatList: getChatList,
            getChatDetails: getChatDetails

        };

        return service;

        function getChatList() {
            var deferred = $q.defer();
            var lists = {
                Chatlist: [
                    { ChatName: 'Izaak', ChatMsg: 'Hi there.', ChatTime: '2', ChatPic: 'http://lorempixel.com/50/50/people/1' },
                    { ChatName: 'Reen', ChatMsg: 'Hello there.', ChatTime: '4', ChatPic: 'http://lorempixel.com/50/50/people/2' },
                    { ChatName: 'Hasan', ChatMsg: 'Hi there.', ChatTime: '6', ChatPic: 'http://lorempixel.com/50/50/people/3' },
                    { ChatName: 'Vickie', ChatMsg: 'Wassup there.', ChatTime: '8', ChatPic: 'http://lorempixel.com/50/50/people/4' },
                    { ChatName: 'Kelvin', ChatMsg: 'Hi there.', ChatTime: '10', ChatPic: 'http://lorempixel.com/50/50/people/5' }
                ]
            };
            deferred.resolve(lists);
            return deferred.promise;
        }

        function getChatDetails() {
            var deferred = $q.defer();
            var details = {
                Chatdetails: [
                    { ChatId: 'Izaak', ChatMsg: 'Hi. Can you send me a picture of the blouse?', ChatTime: '2', ChatPic: 'http://lorempixel.com/50/50/people/1' },
                    { ChatId: 'Reen', ChatMsg: 'Hi! Yes can. Later I will send you', ChatTime: '4', ChatPic: 'http://lorempixel.com/50/50/people/5' }

                ]
            };
            deferred.resolve(details);
            return deferred.promise;
        }
    });
