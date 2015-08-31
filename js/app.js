angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Books, $location) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
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