angular.module('openTable')
.factory('reservationsServices', function($q, $http){
  return {
    create: function(data){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/reservations',
        data: data
      }).success(function(entry){
        deferred.resolve(entry);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    read: function(id){
      var deferred = $q.defer();
      var url = id ? 'api/reservations/' + id : 'api/reservations';
      $http({
        method: 'GET',
        url: url
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    update: function(id, params){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/reservations/' + id,
        data: params,
      }).success(function(){
        deferred.resolve();
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    },
    delete: function(id){
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: 'api/reservations/' + id
      }).success(function(){
        deferred.resolve();
      }).error(function(err){
        deferred.reject(err);
      });
      return deferred.promise;
    }
  };
});