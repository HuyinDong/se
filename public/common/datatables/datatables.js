/**
 * Created by dongyin on 1/29/16.
 */
angular.module('myDatatables',[])
        .directive('myDatatables',function(){

            return {
                restrict: 'A',
                link: function(scope,ele,attrs){
                    console.log("myTables");
                        ele.dataTable();
                }
            };
        });