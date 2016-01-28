/**
 * Created by dongyin on 1/25/16.
 */
sidebar.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url: '/home',
                templateUrl: './index/index.client.view.html',
                controller : 'indexController'
            })
            .state('cves',{
                url: '/cves',
                templateUrl: './cves/cves.client.view.html',
                controller : 'cvesController'
            })
            .state('exploits',{
                url: '/exploits',
                templateUrl: './exploits/exploits.client.view.html',
                controller : 'exploitsController'
            })
            .state('vendors',{
                url: '/vendors',
                templateUrl: './vendors/vendors.client.view.html',
                controller : 'vendorsController'
            })
            .state('references',{
                url: '/references',
                templateUrl: './references/references.client.view.html',
                controller : 'referencesController'
            })
            .state('secharts',{
                url : '/secharts',
                templateUrl: './secharts/secharts.client.view.html',
                controller : 'sechartsController'
            })
            .state('secharts.tree', {
                url: '/tree',
                templateUrl: './tree/tree.client.view.html',
                controller : 'treeController'
            })
            .state('secharts.table',{
                url : '/table',
                templateUrl: './table/table.client.view.html',
                controller : 'tableController'
            })
            .state('detail',{
                url : '/detail/:cve',
                templateUrl : './detail/detail.client.view.html',
                controller : 'detailController'
            })
    }
]);