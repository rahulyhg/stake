angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Books, $location) {
    //console.log(Books.viewallbooks());

    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.viewbook', {
        url: '/viewbook/:BookId',
        views: {
            'tab-dash': {
                templateUrl: 'templates/viewbook.html',
                controller: 'ViewBook'
            }
        }
    })
        .state('tab.createbook', {
            url: '/createbook',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/createbook.html',
                    controller: 'CreateBook'
                }
            }
        })
        .state('tab.viewbets', {
            url: '/viewbets/:BookId/:BookName',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/viewbets.html',
                    controller: 'ViewBets'
                }
            }
        })
        .state('tab.createbet', {
            url: '/createbet/:BookId/:HorseId',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/createbet.html',
                    controller: 'CreateBet'
                }
            }
        })
        .state('tab.deletebook', {
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