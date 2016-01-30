/**
 * Created by dongyin on 8/22/15.
 */

var lodash = require('lodash');
var connection = require('../../config/mysql');
var mysql = require('mysql');
var fs = require('fs');
var async = require('async');

/****************************CVES**************************************/

exports.getCVEs = function(req,res,next){
    var sql = "select * from CVEs limit 0,100";
    sql = mysql.format(sql);
    call(connection,sql,req,res,next);
};

exports.getCVEDetail = function(req,res,next){
    var sql = "select * from CVEs where `cvename` = ?";
    var inserts = [req.params["cve"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

/****************************Exploits************************************/

exports.getExploits = function(req,res,next){
    var sql = "select * from smartexploits limit 0,100";
    sql = mysql.format(sql);
    call(connection,sql,req,res,next);
};

exports.getSearchExploits = function(req,res,next){
    var sql = "select * from smartexploits where source = ? and title like ? or description like ? or ereferences like ? limit 0,100";
    var keywords = "%"+req.params["keywords"]+"%";
    var source = req.params["source"]=="empty"?"":req.params["source"];
    var inserts = [source,keywords,keywords,keywords];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};


/***************************For Table***********************************/

exports.getVendor = function(req,res,next){
    var sql = "select distinct(vendor_name) from vendor where `vendor_name` LIKE ?";
    var inserts = ["%"+req.params["likeVendorName"]+"%"];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.getProductFromVendor = function(req,res,next){

    var sql = "select distinct(prod_name) from vendor where vendor_name = ?";
    var inserts = [req.params["vendor"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};


exports.getProductVersionNumber = function(req,res,next){
    var sql = "select distinct(vers_num) from vendor where `vendor_name` = ? and `prod_name` = ?";
    var inserts = [req.params["vendor"],req.params["product"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.getTableProducts = function(req,res,next){
    var ver;
    if(req.params['version'] == 'empty'){
        ver = "%%"
    }else{
        ver = "%"+req.params['version']+"%";
    }
    //   SELECT a.name,a.email, GROUP_CONCAT(c.code)FROM users a
    //   JOIN code_to_user_ref b ON a.user_id = b.user_id
    //   JOIN codes c ON b.code_id = c.code_id
    var sql = "select a.vers_num, a.edition , c.cvename from vendor a " +
        "inner join cve_vendor b on a.vendor_id = b.vendor_id " +
        "inner join CVEs c on b.cve_id = c.cve_id where vendor_name = ? and prod_name = ? and vers_num like ?";
    var inserts = [req.params["vendor"],req.params["product"],ver];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

/****************************For Tree Chart**********************************/

exports.getLikeProducts = function(req,res,next){
    var ver;
    if(req.params['version'] == 'empty'){
        ver = "%%"
    }else{
        ver = "%"+req.params['version']+"%";
    }
    var sql = "select distinct(vers_num) from vendor where vendor_name = ? and prod_name = ? and `vers_num` LIKE ?";
    var inserts = [req.params["vendor"],req.params["product"],ver];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.getExactProducts = function(req,res,next){
    console.log("exactProduct");
    var version = req.params['version'] == "empty"?"":req.params['version'];
    var sql = "select distinct(edition) from vendor where `vendor_name` = ? and `prod_name` = ? and `vers_num` = ?";
    var inserts = [req.params["vendor"],req.params["product"],version];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.getCveNum = function(req,res,next){
    console.log("cveNum");
    var version = req.params['version'] == "empty"?"":req.params['version'];
    var edition = req.params['edition'] == "empty"?"":req.params['edition'];
    var vendor_id ;
    var sql = "select vendor_id from vendor where vendor_name = ? and prod_name = ? and vers_num = ? and edition = ?";
    var inserts = [req.params["vendor"],req.params["product"],version,edition];
    sql = mysql.format(sql,inserts);
    connection.query(sql, function (err, rows) {
        console.log(rows);
        vendor_id = rows[0].vendor_id;
        sql = "select a.* from CVEs as a inner join cve_vendor b on a.cve_id = b.cve_id where b.vendor_id = ?";
        inserts = [vendor_id];
        sql = mysql.format(sql,inserts);
        call(connection,sql,req,res,next);
    });
    //SELECT a.* FROM `CVEs` as a inner join cve_vendor b on a.cve_id = b.cve_id WHERE b.vendor_id= 2/
};

/*****************************NOT USED YET*********************************************/

exports.selectProducts = function(req,res,next){
    var ver;
    console.log("treeProduct");
    if(req.params['version'] == 'empty'){
        ver = "%%"
    }else{
        ver = "%"+req.params['version']+"%";
    }
    var sql = 'select distinct(vers_num) from vuln_soft where vendor = ? and prod_name = ? and `vers_num` LIKE ?';
    var inserts = [req.params["vendor"],req.params["product"],ver];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.selectAll = function(req,res,next){
    var sql = 'select * from ??';
    var inserts = [req.params["table"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};


//SELECT a.* FROM `smartexploits` as a inner join cve_exploits b on a.id = b.eid WHERE b.cve= 'CVE-2013-4625'/

exports.getSmartExploits = function(req,res,next){
    var cve = req.params["cve"];
    //var sql = "SELECT a.* FROM `smartexploits` as a inner join cve_exploits b on a.id = b.eid WHERE b.cve= ?";
    var sql = "SELECT * FROM `smartexploits` where ereferences = ?";
    var inserts = [cve];
    sql = mysql.format(sql,inserts);
    connection.query(sql, function (err, rows) {
        if(rows != ""){
            var paths = [];
                for(var i = 0; i<rows.length;i++){
                   // if(rows[i].filetype != null){
                        paths.push('./public/data'+rows[i].filelink);
                    /*}else{
                        paths.push('./public/data'+rows[i].filelink);
                    }*/
                }
            console.log(paths);
            var results = [];
            var object = {}
            ;
            rows.forEach(function(ele){
                object.row = ele;
                results.push(object);
                object = {};
            });
            console.log(results);
            var temp = []
                paths.forEach(function(path,index){
                fs.readFile(path,function(err,content){
                        console.log("path",path)
                        console.log("content",content);
                    if(content){
                    temp.push(content.toString());
                    if(index === paths.length - 1){
                        for(var i =0;i < temp.length; i++){
                            results[i].content = temp[i];
                        }
                        console.log(results);
                        res.json(results);
                    }
                    }else{
                        res.json({
                            msg: "not found"
                        });
                    }
                });
            });
            }
                else
            {
                res.json({
                    msg: "null"
                });
            }
});
}


function call(connection,query,req,res,next){
        connection.query(query, function (err, rows) {
            try{
                res.json(rows);
            }catch(err){
                res.json(err);
            }
        });

}

