angular.module('openTable')
.controller('editReservationController', function($scope, $rootScope, $routeParams, $filter, $location, reservationsServices){

  var setScope = function(){
    angular.extend($scope, $rootScope.reservations[$routeParams.id]);
    $scope.time = $filter('date')($scope.date, 'HHmm');
    $scope.date = $filter('date')($scope.date, 'yyyy-MM-dd');
  };

  if($rootScope.reservations === undefined){
    reservationsServices.read().then(function(data){
      // hash the reservations for quick lookup
      $rootScope.reservations = data.reduce(function(hash, res){
        hash[res.id] = res;
        return hash;
      }, {});
      setScope();
    }, function(err){
      $rootScope.err = err;
      $rootScope.hasErr = true;
    });
  } else {
    setScope();
  }

  $scope.submit = function(){
    var time = $scope.time.substr(0,2) + ':' + $scope.time.substr(2,4)
    var date = new Date($scope.date + ' ' + time).toUTCString();
    reservationsServices.update($routeParams.id, {
      name:         $scope.name,
      phone_number: $scope.phone_number,
      email:        $scope.email,
      party_size:   $scope.party_size,
      date:         date
    }).then(function(){
      $rootScope.reservations[$routeParams.id] = {
        id:           $routeParams.id,
        name:         $scope.name,
        phone_number: $scope.phone_number,
        email:        $scope.email,
        party_size:   $scope.party_size,
        date:         new Date(date)
      };
      $location.path('/');
    }, function(err){
      $scope.hasError = true;
      $scope.err = err;
    })
  }

});