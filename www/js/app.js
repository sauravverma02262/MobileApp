// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var myApp = angular.module('starter', ['ionic', 'ngCordova'])

myApp.run(function($ionicPlatform, $cordovaSQLite) {
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

myApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
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
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/partials/forms/signUp.html',
            controller: "signUpCtrl"


        })
        .state('user', {
            url: '/user',
            templateUrl: 'templates/views/user.html',
            controller: 'userCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/partials/profile.html',
            controller: 'profileCtrl'
        })
        .state('editProfile', {
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
        })
        .state('setting', {
            url: '/setting',
            templateUrl: 'templates/partials/settings.html',
            controller: 'settingCtrl'
        }).state('friends', {
            url: '/friends',
            templateUrl: 'templates/partials/friends.html'

        });

    $stateProvider
        .state('netaapp', {
            url: '/netaapp',
            abstract: true,
            templateUrl: 'templates/Netaji/netaApp.html'
        })
        .state('netaapp.login', {
            url: '/login',
            views: {
                'user-login': {
                    templateUrl: 'templates/Netaji/forms/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('netaapp.signup', {
            url: '/signup',
            views: {
                'user-signup': {
                    templateUrl: 'templates/Netaji/forms/signUp.html',
                    controller: 'signUpCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/netaapp/login');

});
