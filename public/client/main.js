angular.module('openTable', ['ngRoute', 'ui.mask'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'listController',
    templateUrl: 'client/views/list.html'
  })
  .when('/reservations/new', {
    controller: 'newReservationController',
    templateUrl: 'client/views/new.html'
  })
  .when('/reservations/edit/:id', {
    controller: 'editReservationController',
    templateUrl: 'client/views/edit.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})