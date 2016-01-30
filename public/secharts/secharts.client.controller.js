/**
 * Created by dongyin on 9/5/15.
 */
secharts.controller("sechartsController",function($scope,$http,$rootScope,$state,$mdDialog,$timeout) {


    $scope.object = {};
    $scope.selectedVendor = '';
    $scope.object.filter = '';
    $scope.object.products = '';
    var times = 0;
    var excuted = false;


    $(document).on('keypress', '#vendor', getVendorInfo);
    console.log("a");
    function getVendorInfo() {
        if($('#vendor').val().length > 2 && !excuted){
            $http.get('data/vendor/like/'+$('#vendor').val()).success(function (data) {
                console.log(data);
                $scope.object.vendor = _.map(data.data, function (d) {
                    return d.vendor_name;
                });
                excuted = true;
            });
        }else if($('#vendor').val().length < 2){
            $scope.object.vendor = [];
            excuted = false;
        }

    }


    function getVulnInfo() {
        if( $scope.object.products != ''){
            $scope.object.products = '';
        }
        if( $scope.object.filter != ''){
            $scope.object.filter = '';
        }

        $http.get('/data/vendor/' + $scope.object.selectedVendor).then(function (data) {
            $scope.object.products = data.data;
        });

    };
    $(document).on('change', '#vendor', getVulnInfo);

        console.log();
        $scope.getTreeChart = function() {

                /*    $("#type").animate({
                        left: '145',
                        top: '-50'
                    });
                    $("#vendorname").animate({
                        left: '370',
                        top: '-133'
                    });
                    $("#productname").animate({
                        left: '595',
                        top: '-216'
                    });
                    $("#versionnumber").animate({
                        left: '820',
                        top: '-299'
                    });
                    $("#gettree").animate({
                        left: '1045',
                        top: '-382'
                    });
                */
                $rootScope.prevent = false;
                if ($scope.object.selectedVendor == null) {
                    showAlert();
                } else if($scope.object.type == 'tree'){
                    $rootScope.object = $scope.object;
                    $state.go("secharts.tree");
                }else if($scope.object.type == 'table'){
                    d3.select("svg").remove();
                    $rootScope.object = $scope.object;
                    $state.go("secharts.table");
                }else{

                }

    }

    function showAlert() {
        var alert = $mdDialog.alert({
            title: "Product name can't be null",
            textContent: 'This is an example of how easy dialogs can be!',
            ok: 'Close',
            ariaLabel:'Alert Dialog Demo'
        });
        $mdDialog.show( alert );
    }

    $(document).on('focus', '#filter', getVersionNum);

    function getVersionNum(){
        console.log("versionnum");
        $http.get('/data/vendor/' + $scope.object.selectedVendor+'/'+$scope.object.selected).then(function (data) {
            var arr = _.forEach(data.data,function(d){
                if(d.vers_num ==""){
                    d.vers_num = "empty";
                }
            })
            console.log(arr);
            $scope.object.versionNum = arr;
        });


    }

    $scope.getCSS = function() {

    }

    $scope.getPosition = function(){
        console.log($("#type").position());
        console.log($("#vendorname").position());
        console.log($("#productname").position());
        console.log($("#versionnumber").position());
    }
});
