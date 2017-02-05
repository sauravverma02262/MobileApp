angular.module('starter.controllers', [])

.controller('signUpCtrl', function($scope, DBService, $cordovaDialogs, $state, profileService) {
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
        })

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
})


.controller('loginCtrl', function($cordovaSpinnerDialog, $scope, $stateParams, $state, DBService, $ionicHistory, $cordovaToast, $cordovaVibration, $cordovaSpinnerDialog) {

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
    }).controller('userCtrl', function($scope, $state, DBService, $cordovaSpinnerDialog) {

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
    ).controller('imageCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    }).controller('videoCtrl', function($scope, $state, DBService, videoService) {
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




    }).controller('settingCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    });
