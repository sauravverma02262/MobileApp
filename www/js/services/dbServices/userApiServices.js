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