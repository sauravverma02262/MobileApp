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