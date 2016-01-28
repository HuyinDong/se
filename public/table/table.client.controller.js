/**
 * Created by dongyin on 1/10/16.
 */
table.controller("tableController",['$rootScope','$scope', '$http','$timeout','$mdDialog',
    function ($rootScope,$scope, $http,$timeout,$mdDialog) {
    var cve ;
    $scope.loading = true;
        $scope.selected = false;
        var length ;
        console.log( $scope.selected);
    var object = $rootScope.object;
    if(object.filter == "empty"){
        object.filter = "";
    }
    if(object.filter == ""){
        object.filter = 'empty';
    }
        var cellTemplate = '<div id={{row.entity.name}}-{{col.colDef.name}} ' +
            'class="ui-grid-cell-contents" ng-click="getDetail()"> {{COL_FIELD CUSTOM_FILTERS}}</div>';
        $scope.gridOptions = {
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: false,
            enableColumnMenus: false,
            enableMinHeightCheck:true,
            enableFullRowSelection:true,
            enableSelectAll: false,
            enableRowHeaderSelection:false,
            multiSelect:false,
            columnDefs: [
                { field: 'edition', width: '33%', displayName : 'Edtion',allowCellFocus : false},
                { field: 'cvename', width: '33%' , displayName : 'CVE',cellTemplate: cellTemplate},

                { field: 'vers_num',  grouping: { groupPriority: 0 },allowCellFocus : false,
                    sort: { priority: 0, direction: 'desc' }, width: '29%',displayName : 'Version Number'}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;

                gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol) {
                    console.log(gridApi.cellNav.getFocusedCell());
                    console.log(newRowCol);
                    console.log(oldRowCol);
                    if(oldRowCol != null) {
                        if (newRowCol.row.uid != oldRowCol.row.uid) {
                            var cve = $scope.gridApi.grid.getCellValue(newRowCol.row, newRowCol.col);
                            console.log(cve);
                            if (cve) {
                                $mdDialog.show({
                                    templateUrl: './detail/detail.client.view.html',
                                    locals: {
                                        items: cve
                                    },
                                    controller: 'detailController',
                                    clickOutsideToClose: true
                                });
                            }
                        }
                    }
                });

            }
        };
        $scope.height = "height : "+($(window).height()-82-62-12)+"px";

       $scope.getDetail = function(){
            console.log("OK");

        };

        $timeout(function(){
            $http.get('data/vendor/table/' + object.selectedVendor + '/' + object.selected+'/'+object.filter)
                .then(function(data) {
                    $scope.loading = false;
                    console.log(data);
                    var items = data.data;
                    length = items.length;
                    $scope.gridOptions.data = items;

                });
        },1500);

    }]);