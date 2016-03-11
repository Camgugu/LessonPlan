/**
 * Created by li-rz on 16-3-8.
 */
var util = require('util');
// require('koa-validate');
var db = require('../models/index.js');
var debug = require('../instance/debug.js');
var render = require('../instance/render.js');

module.exports = function (router) {

    var Test = db.models.Test;

    router.get('/', function *() {
        var data = yield Test.findAll();
        this.body = yield render('index.jade', JSON.stringify(data));
    });

    router.post('/', function *() {
        var body = this.request;
        //var data = JSON.parse(body.body);
        //this.checkBody('username').notEmpty().isEmail();
        //this.checkBody('password').notEmpty().len(6, 20).md5();
        //if (this.error) {
        //    this.body = this.error;
        //    return;
        //}

        debug(body);
        console.log(body);
        var data = body.body;
        console.log(data);
        Test.create({
            title: data.title,
            username: data.username,
            password: data.password,
            time: new Date()
        });
        console.log('ok');
        this.body = 'success';
    })
};