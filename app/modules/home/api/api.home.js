'use strict';
angular
    .module('app.home')
    .factory('homeService', function($q) {
        // all app modals here

        var service = {
            getCategoryList: getCategoryList,
            getProductList: getProductList,
            getProductDetails: getProductDetails,
            getSellerDetails: getSellerDetails
        };

        return service;

        function getCategoryList() {
            var deferred = $q.defer();
            var categories = {
                Itemlist: [
                    { CategoryID: 'asad5a4a4a', CategoryName: 'Fashion', Thumbnail: 'http://lorempixel.com/360/190/people/1' },
                    { CategoryID: 'asad5a4a4b', CategoryName: 'Women', Thumbnail: 'http://lorempixel.com/360/190/people/2' },
                    { CategoryID: 'asad5a4a4c', CategoryName: 'Kids', Thumbnail: 'http://lorempixel.com/360/190/people/3' },
                    { CategoryID: 'asad5a4a4d', CategoryName: 'Electronics', Thumbnail: 'http://lorempixel.com/360/190/people/4' },
                    { CategoryID: 'asad5a4a4e', CategoryName: 'Others', Thumbnail: 'http://lorempixel.com/360/190/people/5' }
                ]
            };
            deferred.resolve(categories);
            return deferred.promise;
        }

        function getProductList() {
            var deferred = $q.defer();
            var products = {
                Itemlist: [
                    { PostID: '1', Title: 'Fashion', Thumbnail: 'http://lorempixel.com/400/400/abstract/6', Price: 'RM 28.00', PostDate: '', Likes: '223', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'Suriam Ram Ram' },
                    { PostID: '2', Title: 'Women', Thumbnail: 'http://lorempixel.com/400/400/abstract/2', Price: 'RM 90.00', PostDate: '', Likes: '223', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'Mary' },
                    { PostID: '3', Title: 'Kids', Thumbnail: 'http://lorempixel.com/400/400/abstract/3', Price: 'RM 25.00', PostDate: '', Likes: '229', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'Kiki' },
                    { PostID: '4', Title: 'Electronics', Thumbnail: 'http://lorempixel.com/400/400/abstract/4', Price: 'RM 30.00', PostDate: '', Likes: '220', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'Lala' },
                    { PostID: '5', Title: 'Others', Thumbnail: 'http://lorempixel.com/400/400/abstract/5', Price: 'RM 28.00', PostDate: '', Likes: '223', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'John' },
                    { PostID: '6', Title: 'Others', Thumbnail: 'http://lorempixel.com/400/400/abstract/7', Price: 'RM 50.00', PostDate: '', Likes: '111', Comments: '10', SellerPic: 'http://lorempixel.com/80/80/people/6', SellerName: 'Reen' }
                ]
            };
            deferred.resolve(products);
            return deferred.promise;
        }

        function getProductDetails() {
            var deferred = $q.defer();
            var productDetails = {
                Item: {
                    Title: 'Fashion Item',
                    Thumbnail: 'http://lorempixel.com/400/400/abstract/6',
                    Imagelist: [
                        { Url: 'http://lorempixel.com/400/400/abstract/6', Selected: true },
                        { Url: 'http://lorempixel.com/400/400/abstract/2', Selected: false },
                        { Url: 'http://lorempixel.com/400/400/abstract/3', Selected: false },
                        { Url: 'http://lorempixel.com/400/400/abstract/4', Selected: false },
                        { Url: 'http://lorempixel.com/400/400/abstract/5', Selected: false },
                        { Url: 'http://lorempixel.com/400/400/abstract/7', Selected: false }
                    ],

                    Id: '#12345678910',
                    ProductTitle: 'Blacky Shoe Hoo',
                    SellerName: 'Suri Ram Ram',
                    JoinPeriod: 2,
                    Price: 75.00,
                    OfferPrice: 50.00,
                    Location: 'KL Sentral',
                    Brand: 'Puma',
                    ShippingFee: 'Included',
                    DeliveryTime: '2-3 weeks',
                    Color: 'Blue, Red, Purple',
                    Size: '28 cm H x 35.5 cm W',
                    Likes: 233,
                    Info1: 'Zip fastening on the top ',
                    Info2: 'Short handles on top',
                    Info3: 'Long adjustable strap '


                }
            };
            deferred.resolve(productDetails);
            return deferred.promise;
        }

        function getSellerDetails() {
            var deferred = $q.defer();
            var sellerDetails = {
                Item: {
                    Title: 'Fashion ',
                    CoverPic: 'http://lorempixel.com/400/400/abstract/9',
                    Thumbnail: 'http://lorempixel.com/400/400/abstract/3',
                    Imagelist: [
                        {},
                        {},
                        {},
                        {},
                        {},
                        {}
                    ],

                    SellerPic: 'http://lorempixel.com/80/80/people/3',
                    SellerId: 'ES-100000099',
                    SellerName: 'Suri Ram Ram',
                    Followers: 200,
                    Viewed: 123,
                    Comments: 10,
                    Likes: 233,
                    ProductTitle: 'Blacky Shoe Hoo',
                    JoinPeriod: 2,
                    Price: 75.00

                }
            };
            deferred.resolve(sellerDetails);
            return deferred.promise;
        }

    });
