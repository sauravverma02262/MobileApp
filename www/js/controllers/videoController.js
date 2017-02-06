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