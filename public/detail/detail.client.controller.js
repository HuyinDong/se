/**
 * Created by dongyin on 1/11/16.
 */
detail.controller('detailController',['$scope','items','$mdDialog','$http','$sce','$timeout',
    function($scope,items,$mdDialog,$http,$sce,$timeout){
        $scope.loading = true;
    $scope.cve = items;
   /* $(function(){
        SyntaxHighlighter.all();
    });*/
    $scope.newData = [];
    $scope.contents = [];
    $scope.info = [];
    //'data/smartexploits/'+items
    $http.get('data/smartexploits/'+items).then(function(data){
        console.log(data.data);
        if(data.data.msg == "not found") {
            $scope.info= [{content:"Not Found"}];
        }else{
            $timeout(function () {
                $scope.loading = false;
                $scope.info = data.data;
            }, 800);
        }
    });
        //data/cves/CVE-2013-4759
        $http.get('data/cves/'+items).then(function(data){
            console.log(data);
            if(data.data.msg == null) {
                $timeout(function () {
                    $scope.loading = false;
                    $scope.cveInfo = data.data;
                }, 800);
            }
        });
    $scope.closeDialog = function(){
        $mdDialog.cancel();
    }
}]);