'use strict';

/* Controllers */
var phoneApp = angular.module('smartApp', ['ngRoute', 'ngResource']);

phoneApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'template/home.html',
        controller:'PhoneListCtrl'
      })
      .when('/about',{
        templateUrl:'template/about.html',
        controller:'AboutCtrl'
      })
      .when('/contact',{
        templateUrl:'template/contact.html',
        controller:'ContactCtrl'
      })
      .when('/phones/:phoneId', {
        templateUrl:'template/phone-detail.html',
        controller:'PhoneDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

/*Factory*/
phoneApp.factory('Phone', [
  '$resource', function($resource) {
    return $resource('phones/:phoneId.:format', {
      phoneId: 'phones',
      format: 'json',
      apiKey: 'someKeyThis'
    }, {
      update: {method: 'PUT', params: {phoneId: '@phone'}, isArray: true}
    });
   }
  ]);

/* Filter */
phoneApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

phoneApp.controller('PhoneListCtrl',['$scope','$http', '$location', 'Phone', function($scope, $http, $location, Phone) {
  
  $scope.phones = Phone.query();

}]);
//About Controller
phoneApp.controller('AboutCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
//Contact Controller
phoneApp.controller('ContactCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
//Phone Detail Controller
phoneApp.controller('PhoneDetailCtrl', ['$scope','$http', '$location', '$routeParams', 'Phone',
  function($scope, $http, $location, $routeParams, Phone) {
  $scope.phoneId = $routeParams.phoneId;
  var url = 'phones/'+$routeParams.phoneId+'.json';
  Phone.get({phoneId: $routeParams.phoneId}, function(data){
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];
  });

  $http.get(url).success(function(data) {
    $scope.phone = data;
    $scope.mainImageUrl = data.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }

}]);


