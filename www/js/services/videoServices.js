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