
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
