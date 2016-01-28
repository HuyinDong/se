/**
 * Created by dongyin on 1/25/16.
 */

cves.controller('cvesController',function($scope,$http,$timeout){
    $scope.cves = {};
    console.log("cves");

    $http.get('/data/cves').then(function(data){
        $scope.cves = data.data;
        console.log(data.data);
        $scope.total = data.data.length;
    });


    $timeout(function(){
        $('#example').dataTable( {

            "PaginationType": "four_button"
        } );
    }, 0, false);

});