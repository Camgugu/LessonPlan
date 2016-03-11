/**
 * Created by li-rz on 16-3-7.
 */
var Router = require('koa-router'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    debug = require('../instance/debug');

var router = new Router();


var loadDir = function (dir) {
    fs.readdirSync(dir)
    .forEach(function (file_name) {
        var next_path = path.join(dir, file_name),
            stat = fs.statSync(next_path);
        if (stat.isDirectory()) {
            loadDir(next_path);
        } else if (stat.isFile() && file_name.indexOf('.') !== 0 && file_name !== 'index.js') {
            require(next_path)(router);
        }
    });
};

loadDir(__dirname);

module.exports = router.middleware();