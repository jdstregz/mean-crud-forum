angular.module('AuthService', []).service('AuthenticationService', function($q, $http){
    var authorized = false;
    
    var register = function(user) {
        return $q(function(resolve, reject) {
            $http.post('api/signup', user).then(function(result) {
                if (result.data.success){
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    }
    
    var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post('api/loginv2', user).then(function(result) {
        if (result.data.success) {
          authorized = true;
          resolve(result.data.msg);
          
        } else {
          reject(result.data.msg);
          authorized = false;
        }
      });
    });
  };
 
  var logout = function() {
    return $q(function(resolve, reject){
        $http.get('api/logout').then(function(result){
            if(result.data.success) {
                resolve(result.data.msg);
                authorized = false;
            } else {
                reject(result.data.msg);
                authorized = false;
            }
        });
    });
  };
  
  var authenticationRequest = function() {
      $http.get('api/authentication').then(function(result) {
          if(result.data.success) {
              console.log("Success");
              return true;
          } else {
              console.log("Failure");
              return false;
          }
      });
  };
 
  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: authenticationRequest,
    authorized: authorized
  };
});