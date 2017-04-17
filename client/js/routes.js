angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/topics', {
            templateUrl: 'views/topics.html',
            controller: 'TopicController'
        })
        .when('/login',{
            templateUrl: 'views/login.html', 
            controller: 'LoginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'InsideCtrl'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'InsideCtrl'
        })
        .otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode(true);
        
}]).run(function($rootScope, $http, $location, AuthenticationService, AUTH_EVENTS) {
    $rootScope.$on('$locationChangeStart', function(event, next, current){
        $http.get('api/authentication').then(function(result) {
          if(!result.data.success) {
              var publicPages = ['/login', '/', '/register'];
                var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if(restrictedPage) {
                alert("Login to Enter");
                $location.path('/login');
            }
          } 
      }); 
    });
});