myApp.controller('imageCtrl', function($scope, $state) {
        $scope.back = function() {
            $state.go("user");
        }

    })