angular.module('openTable')
.controller('listController', function($scope, $rootScope, reservationsServices){
  if($rootScope.reservations === undefined){
    reservationsServices.read().then(function(data){
      // hash the reservations for quick lookup
      $rootScope.reservations = data.reduce(function(hash, res){
        hash[res.id] = res;
        return hash;
      }, {});
    }, function(err){
      $rootScope.err = err;
      $rootScope.hasErr = true;
    });
  }

  $scope.delete = function($event, id){
    $event.preventDefault();
    reservationsServices.delete(id).then(function(){
      delete $rootScope.reservations[id];
    }, function(err){
      $scope.hasError = true;
      $scope.err = err;
    });
  };
});