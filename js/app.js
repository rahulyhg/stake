// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Books, $location) {
    //console.log(Books.viewallbooks());

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        //
        //        var db = Books.getdb();
        //        db.transaction(function (tx) {
        //            var booklength = 0;
        //            console.log("database Loaded");
        //            tx.executeSql('SELECT * FROM BOOKS', [], function (tx, results) {
        //                booklength = results.rows.length;
        //                for (var i = 0; i < booklength; i++) {
        //                    bookrow = results.rows.item(i);
        //                    if (bookrow.date == "undefined") {
        //                        bookrow.date = "";
        //                    }
        //                    Books.createbook(bookrow.name, bookrow.date, [], bookrow.id);
        //                    //console.log(Books.viewallbooks());
        //                }
        //            });
        //            tx.executeSql('SELECT * FROM HORSES', [], function (tx, results) {
        //                horselength = results.rows.length;
        //                for (var i = 0; i < horselength; i++) {
        //                    horserow = results.rows.item(i);
        //
        //                    Books.insertonlyhorse(horserow.book, horserow.name, horserow.id);
        //                    console.log(Books.viewallbooks());
        //                }
        //
        //            });
        //
        //            tx.executeSql('SELECT * FROM BETS', [], function (tx, results) {
        //                betlength = results.rows.length;
        //                for (var i = 0; i < betlength; i++) {
        //                    betrow = results.rows.item(i);
        //
        //                    Books.createbet(betrow.book, betrow.favorite, betrow.backlay, betrow.odds, betrow.stake, betrow.id);
        //                    console.log(Books.viewallbooks());
        //                }
        //
        //            });
        //
        //        }, null);
        //        $location.path("/tab/dash2/");

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        cache: false,
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        cache: false,
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.viewbook', {
        cache: false,
        url: '/viewbook/:BookId',
        views: {
            'tab-dash': {
                templateUrl: 'templates/viewbook.html',
                controller: 'ViewBook'
            }
        }
    })
        .state('tab.createbook', {
            cache: false,
            url: '/createbook',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/createbook.html',
                    controller: 'CreateBook'
                }
            }
        })
        .state('tab.viewbets', {
            cache: false,
            url: '/viewbets/:BookId',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/viewbets.html',
                    controller: 'ViewBets'
                }
            }
        })
        .state('tab.createbet', {
            cache: false,
            url: '/createbet/:BookId/:HorseId',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/createbet.html',
                    controller: 'CreateBet'
                }
            }
        })
        .state('tab.deletebook', {
            cache: false,
            url: '/deletebook/:BookId',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/deletebook.html',
                    controller: 'DeleteBook'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

})

.filter('totalcolor', function() {
    return function(input) {

        input = parseInt(input);
        if (input > 0)
            return 'balanced';
        else if (input < 0)
            return 'assertive';
        else
            return 'positive';
    };
})
    .filter('BackLay', function() {
        return function(input) {
            if (input == 1)
                return 'Lay';
            else
                return 'Back';
        };
    })

;