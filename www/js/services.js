 angular.module('starter.services', [])
     .service('profileService', ['$q', 'DBService', function($q, DBService) {

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
     .service('videoService', function($q, DBService) {
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

 .service('DBService', ['$q', '$http', function($q, $http) {
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


 /*

 this.updateUserProfileId = function(user) {
          var deferred = $q.defer();
          var profileDetailsId = {
              profileDetails: profileId
          }
          var self = this;
          $http.put('http://localhost:9000/api/user/' + userId, profileDetailsId).then(function mySucces(res) {
              self.currentUser = res.data;
              console.log(res.data);
              deferred.resolve(res.data);

          }, function myError(err) {
              deferred.resolve(false);
          });
          return deferred.promise;
      }

 */

 /*this.insert = function(userDetails) {
             var deferred = $q.defer();
             var query = "INSERT INTO Users (firstname, lastname,email,gender,password) VALUES (?,?,?,?,?)";
             $cordovaSQLite.execute(db, query, [userDetails.name,userDetails.lastname,userDetails.email,userDetails.gender, userDetails.pass]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
                 deferred.resolve({ status: true });
             }, function(err) {
                 deferred.resolve({ status: false, message: err });
             });
             return deferred.promise;
         }
         // get all Data from Users Table
     this.select = function() {
         var deferred = $q.defer();
         // var query = "SELECT firstname, lastname FROM Users WHERE lastname = ?";
         var query = "SELECT * FROM Users";
         $cordovaSQLite.execute(db, query).then(function(res) {
             var userData = [];
             if (res.rows.length > 0) {
                 angular.forEach(res.rows, function(row) {
                     userData.push(row);
                 });

                 deferred.resolve(userData);
                 console.log("SELECTED -> " + res.rows.item(res.rows.length - 1).firstname + " " + res.rows.item(res.rows.length - 1).lastname);
             } else {
                 deferred.reject({ message: 'No Result Found' });
                 console.log("No results found");
             }
         }, function(err) {
             deferred.reject({ message: err });
             console.error(err);
         });
         return deferred.promise;
     }*/
