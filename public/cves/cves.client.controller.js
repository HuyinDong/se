/**
 * Created by dongyin on 1/25/16.
 */

cves.controller('cvesController',function($scope,$http){
    $scope.cves = {};
    console.log("cves");
    $scope.customer = {
        name : "tom",
        address : "1700 Amp"
    }
    $http.get('/data/cves').then(function(data){
        $scope.cves = data.data;
        console.log(data.data);
        $scope.total = data.data.length;
    });


});

cves.directive('myCustomer', function() {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}'
    };

});