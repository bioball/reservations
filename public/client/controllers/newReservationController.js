angular.module('openTable')
.controller('newReservationController', function($scope, $location, $rootScope, reservationsServices){
  $scope.submit = function(){
    var time = $scope.time.substr(0,2) + ':' + $scope.time.substr(2,4)
    var date = new Date($scope.date + ' ' + time).toUTCString();
    reservationsServices.create({
      name:         $scope.name,
      phone_number: $scope.phone_number,
      email:        $scope.email,
      party_size:   $scope.party_size,
      date:         date
    }).then(function(entry){
      $rootScope.reservations[entry.id] = entry;
      $location.path('/');
    }, function(err){
      $scope.hasError = true;
      $scope.err = err;
    });
  };

});