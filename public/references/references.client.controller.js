/**
 * Created by dongyin on 1/27/16.
 */
references.controller('referencesController',function($scope,$http){
    $scope.keywords = "" ;
    $scope.searchReferences = function(){
        if($scope.keywords == ""){
            alert("Can't be null");
        }else {
            $http.get('/data/references/search/' + $scope.keywords).then(function (data) {
                $scope.references = data.data;
            });

        }
    };

    $http.get('/data/references').then(function(data){
        $scope.references = data.data;
        $scope.total = data.data.length;
    });
});