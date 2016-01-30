/**
 * Created by dongyin on 1/27/16.
 */
vendors.controller('vendorsController',function($scope,$http){
    $scope.keywords = "" ;
    $scope.searchVendors = function(){
        if($scope.keywords == ""){
            alert("Can't be null");
        }else {
                $http.get('/data/vendors/search/' + $scope.keywords).then(function (data) {
                    $scope.vendors = data.data;
                });

        }
    };

    $http.get('/data/vendors').then(function(data){
        $scope.vendors = data.data;
        $scope.total = data.data.length;
    });
});