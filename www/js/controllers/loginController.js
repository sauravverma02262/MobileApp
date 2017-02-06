
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