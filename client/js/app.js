angular.module('starter', ['ngRoute', 'routes', 'MainCtrl', 'Topic', 'AuthService'])
.constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
})
.constant('API_ENDPOINT', {
    url: 'http://127.0.0.1:8080/api'
});