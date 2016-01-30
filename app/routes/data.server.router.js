
var data = require('../controllers/data.server.controller');

module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('index', {});
    });
    app.get('/test', function (req, res) {
        res.render('test', {});
    });
    /****************************cve********************************/

    app.get('/data/cves',data.getCVEs);
    app.get('/data/cves/:cve',data.getCVEDetail);
    app.get('/data/cves/search/:keywords',data.getSearchCVEs);

    /****************************exploits***************************/

    app.get('/data/exploits',data.getExploits);
    app.get('/data/exploits/search/:source/:keywords',data.getSearchExploits);

    /****************************vendors*****************************/

    app.get('/data/vendors',data.getVendors);
    app.get('/data/vendors/search/:keywords',data.getSearchVendors);

    /****************************vendors*****************************/

    app.get('/data/References',data.getReferences);
    app.get('/data/References/search/:keywords',data.getSearchReferences);

    /*******************table and tree chart************************/
    app.get('/data/vendor/like/:likeVendorName',data.getVendor);
    app.get('/data/vendor/:vendor',data.getProductFromVendor);
    app.get('/data/vendor/:vendor/:product',data.getProductVersionNumber);
    app.get('/data/vendor/table/:vendor/:product/:version',data.getTableProducts);

    app.get('/data/vendor/tree/like/:vendor/:product/:version',data.getLikeProducts);
    app.get('/data/vendor/tree/:vendor/:product/:version',data.getExactProducts);
    app.get('/data/vendor/tree/:vendor/:product/:version/:edition',data.getCveNum);

    app.get('/data/smartexploits/:cve',data.getSmartExploits);
};