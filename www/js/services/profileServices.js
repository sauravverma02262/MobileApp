myApp.service('profileService', ['$q', 'DBService', function($q, DBService) {

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
