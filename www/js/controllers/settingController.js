myApp.controller('settingCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    });
