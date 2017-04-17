angular.module('AuthService')
 
.controller('LoginCtrl', function($scope, AuthenticationService, $location) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthenticationService.login($scope.user).then(function(msg) {
      $location.path('/');
    }, function(errMsg) {
      var alertPopup = alert('Please use proper credentials');
    });
  };
})
 
.controller('RegisterCtrl', function($scope, AuthenticationService, $location) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthenticationService.register($scope.user).then(function(msg) {
      $location.path('/login');
      var alertPopup = alert('Register success!');
    }, function(errMsg) {
      var alertPopup = alert('Register failed!');
    });
  };
})
 
.controller('InsideCtrl', function($scope, AuthenticationService, API_ENDPOINT, $http, $location) {
  $scope.destroySession = function() {
    AuthenticationService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get('api/currentuser').then(function(result) {
      $scope.memberinfo = "Welcome " + result.data.username;
    });
  };
 
  $scope.logout = function() {
    AuthenticationService.logout();
    $location.path('/login');
  };
})
 
.controller('AppCtrl', function($scope, $location, AuthenticationService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthenticationService.logout();
    $location.path('/login');
    var alertPopup = alert('Session Lost!');
  });
});