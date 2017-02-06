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

myApp.controller('imageCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    })

myApp.controller('loginCtrl', function($cordovaSpinnerDialog, $scope, $stateParams, $state, DBService, $ionicHistory, $cordovaToast, $cordovaVibration, $cordovaSpinnerDialog) {

        $scope.userLogin = {
            firstname: "",
            password: ""
        }
        $scope.submit = function() {
            /*$cordovaSpinnerDialog.show("title", "message", true);
            $cordovaToast
                .show('Login Successsfull', 'short', 'center')
                .then(function(success) {
                    $state.go('user');
                }, function(error) {
                    // error
                });*/
            DBService.login($scope.userLogin).then(function(foundUser) {
                if (foundUser) {
                    $ionicHistory.clearCache().then(function() {
                       /* $cordovaToast
                            .show('Login Successsfull', 'short', 'center')
                            .then(function(success) {
                                $state.go('user');
                            }, function(error) {
                                // error
                            });*/
                        $state.go('user');
                    })

                }
            })
        }
        $scope.GotoSignUp = function() {
            $ionicHistory.clearCache().then(function() {
               // $cordovaVibration.vibrate(100);
                $state.go('signup');
            })
        }
        $scope.GotoNetaSignUp = function() {
            $ionicHistory.clearCache().then(function() {
               // $cordovaVibration.vibrate(100);
                $state.go('netaapp.signup');
            })
        }
    })
myApp.controller('settingCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    });


myApp.controller('signUpCtrl', function($scope, DBService, $cordovaDialogs, $state, profileService) {
    $scope.user = {
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        password: "",
        contact: "",
        imageUrl: "",
        profileDetails: ""
    }
    $scope.registerUser = function() {
        profileService.createUserProfile().then(function(profile) {
            if (profile._id) {
                $scope.user.profileDetails = profile._id;
                DBService.insert($scope.user).then(function(insertStatus) {
                    if (insertStatus) {
                        $scope.SuccessMessage = "User SignUp Success";
                    }

                }, function(err) {
                    console.log("Error : ", err.message);
                });
            }
        });
    }
    $scope.deleteUser = function(user) {
        DBService.deleteUser(user).then(function(data) {
            $scope.SuccessMessage = "User Deleted Successfully";
        })
    }

    DBService.getAllUSer().then(function(res) {
        if (res) {
            $scope.users = res;
        }
    });
});

myApp.controller('userCtrl', function($scope, $state, DBService, $cordovaSpinnerDialog) {

        $scope.users = {};
        $scope.users = DBService.getUser()
       // $cordovaSpinnerDialog.hide();

    })
    .controller('profileCtrl',
        function($scope, $stateParams, profileService, $state, DBService, $ionicHistory) {
            $scope.userProfile = DBService.getUser();
            if ($scope.userProfile._id && $scope.userProfile.profileDetails) {
                $scope.profile = DBService.getUserProfile();
            } else {
                $state.go("app.login");
            }

            $scope.back = function() {
                $state.go("user");
            }
            $scope.backToProfile = function() {
                $ionicHistory.clearCache().then(function() {
                    $state.go("profile");
                });

            }

            $scope.editProfile = function() {
                $state.go('editProfile');
            }

            $scope.updateProfile = function() {
                profileService.updateProfile($scope.profile).then(function(profile) {
                    $scope.profile = profile;
                    $ionicHistory.clearCache().then(function() {
                        $state.go("profile");
                    });
                });
            }
        }
    )
myApp.controller('videoCtrl', function($scope, $state, DBService, videoService) {
        $scope.back = function() {
            $state.go("user");
        }
        $scope.url = "";
        $scope.user = videoService.getUser();
        $scope.video = {
            userId: $scope.user._id,
            videoUrl: "",
            category: "",
            title: "",
            discription: ""
        }
        $scope.formatUrl = function(url) {
            console.log("URL before: " + url)
            var val = url.split("=");
            $scope.video.videoUrl = val[1];
            console.log("URL after: " + $scope.video.videoUrl);
        }
        videoService.getAllVideos().then(function(videos) {
            $scope.videoList = videos;
        });
        $scope.addVideo = function() {

            videoService.addVideo($scope.video).then(function(videos) {
                $scope.videoList = videos;
            })
        }




    })
myApp.service('profileService', ['$q', 'DBService', function($q, DBService) {

    this.getProfileDetails = function(profileId) {
        var deferred = $q.defer();
        var profile = DBService.getProfileDetails(profileId).then(function(profileDetails) {
            if (profileDetails) {
                deferred.resolve(profileDetails);
            } else {
                deferred.resolve([]);
            }
        });

        return deferred.promise;

    }

    this.createUserProfile = function() {
        var profile = {
            discription: "",
            address: {
                state: "",
                city: "",
                country: "",
                streetName: ""
            }

        }
        var deferred = $q.defer();
        DBService.createProfile(profile).then(function(profileData) {
            deferred.resolve(profileData);
        });
        return deferred.promise;
    }
    this.updateProfile = function(profile) {
        var deferred = $q.defer();
        DBService.updateProfile(profile).then(function(profileData) {
            deferred.resolve(profileData);
        });
        return deferred.promise;
    }


}])

myApp.service('videoService', function($q, DBService) {
         this.user = DBService.getUser();

         this.getUser = function(){
            return this.user;
         }
         this.addVideo = function(videoData) {
             var deferred = $q.defer();
             DBService.addVideo(videoData).then(function(res) {
                 if (res) {
                     DBService.getAllVideos().then(function(videos) {
                         deferred.resolve(videos);
                     });
                 } else {
                     deferred.resolve(false);
                 }
             })
             return deferred.promise;
         }

         this.getAllVideos = function() {
             var deferred = $q.defer();
             DBService.getAllVideos().then(function(videos) {
                 deferred.resolve(videos);
             });
             return deferred.promise;
         }

     })
myApp.service('DBService', ['$q', '$http', function($q, $http) {
     this.currentUser = {};
     // Insert Data Users into table 
     this.currentProfile = {};
     this.getUser = function() {
         return this.currentUser;
     }
     this.getUserProfile = function() {
         return this.currentProfile;
     }
     this.getAllUSer = function() {
         var deferred = $q.defer();
         $http.get('http://localhost:9000/api/user').then(function mySucces(res) {
             deferred.resolve(res.data);
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.login = function(userData) {
         var self = this;
         var deferred = $q.defer();
         $http.post('http://localhost:9000/api/user/login/', userData).then(function mySucces(res) {
             self.currentUser = res.data;
             var innerself = self;
             self.getProfileDetails(res.data.profileDetails).then(function(profile) {
                 innerself.currentProfile = profile;
                 deferred.resolve(true);
             })
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.insert = function(userDetails) {
         var deferred = $q.defer();
         var self = this;
         $http.post('http://localhost:9000/api/user', userDetails).then(function mySucces(res) {
             deferred.resolve(true);
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.createProfile = function(profile) {
         var deferred = $q.defer();
         var self = this;
         $http.post('http://localhost:9000/api/profile', profile).then(function mySucces(res) {
             self.currentProfile = res.data;
             deferred.resolve(res.data);
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.deleteUser = function(user) {
         var deferred = $q.defer();
         var self = this;
         $http.delete('http://localhost:9000/api/profile/' + user.profileDetails).then(function mySucces(res) {
             $http.delete('http://localhost:9000/api/user/' + user._id).then(function mySucces(res) {
                 deferred.resolve(res.data);
             });
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.getProfileDetails = function(profileId) {
         var deferred = $q.defer();
         var self = this;
         $http.get('http://localhost:9000/api/profile/' + profileId).then(function mySucces(res) {
             deferred.resolve(res.data);
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.updateProfile = function(profile) {
         var deferred = $q.defer();
         var self = this;
         $http.put('http://localhost:9000/api/profile/' + profile._id, profile).then(function mySucces(res) {
             self.getProfileById(profile._id).then(function(profileData) {
                 deferred.resolve(profileData.data);
             });
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }
     this.getProfileById = function(profile) {
         var deferred = $q.defer();
         var self = this;
         $http.get('http://localhost:9000/api/profile/' + profile).then(function mySucces(res) {
             self.currentProfile = res.data;
             console.log("Profile : ", res.data);
             deferred.resolve(res.data);

         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }

     this.getAllVideos = function() {
         var deferred = $q.defer();
         var self = this;
         $http.get('http://localhost:9000/api/video').then(function mySucces(res) {


             deferred.resolve(res.data);

         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }

     this.addVideo = function(videoData) {
         var deferred = $q.defer();
         var self = this;
         $http.post('http://localhost:9000/api/video', videoData).then(function mySucces(res) {

             deferred.resolve(res.data);
         }, function myError(err) {
             deferred.resolve(false);
         });
         return deferred.promise;
     }

 }]);