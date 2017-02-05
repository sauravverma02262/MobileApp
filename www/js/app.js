// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        if (window.cordova) {
            db = $cordovaSQLite.openDB({ name: "my.db" }); //device
            //$cordovaSQLite.execute(db, "DROP TABLE Users");

            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Users (id integer primary key, firstname text, lastname text,email text,gender text,password text)");

            console.log("Android");
        } else {
            db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
            // $cordovaSQLite.execute(db, "DROP TABLE Users");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Users (id integer primary key, firstname text, lastname text,email text,gender text,password text)");

            console.log("browser");

        }
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
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/app.html'
        })

    .state('app.login', {
            url: '/login',
            views: {
                'user-login': {
                    templateUrl: 'templates/views/login.html',
                    controller: 'loginCtrl'
                }
            }
        }).state('signup', {
            url: '/signup',
            templateUrl: 'templates/partials/forms/signUp.html',
            controller: "signUpCtrl"


        })
        .state('user', {
            url: '/user',
            templateUrl: 'templates/views/user.html',
            controller: 'userCtrl'
        }).state('profile', {
            url: '/profile',
            templateUrl: 'templates/partials/profile.html',
            controller: 'profileCtrl'
        }).state('editProfile', {
            url: '/edit',
            templateUrl: 'templates/partials/forms/editProfile.html',
            controller: 'profileCtrl'
        })
        .state('images', {
            url: '/images/:imageId',
            templateUrl: 'templates/partials/images.html',
            controller: 'imageCtrl'
        })
        .state('videos', {
            url: '/videos/:videoId',
            templateUrl: 'templates/partials/videos.html',
            controller: 'videoCtrl'
        }).state('setting', {
            url: '/setting',
            templateUrl: 'templates/partials/settings.html',
            controller: 'settingCtrl'
        }).state('friends', {
            url: '/friends',
            templateUrl: 'templates/partials/friends.html'

        })







































    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');

});
