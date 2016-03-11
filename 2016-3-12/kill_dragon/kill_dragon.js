/**
 * Created by li-rz on 16-3-7.
 */
var koa = require('koa'),
    staticServer = require('koa-static'),
    koaBody = require('koa-body'),
    path = require('path'),
    router = require('./routes/index'),
    koaValidate = require('koa-validate');


var app = koa(),
    port = 8000;

app.env = 'development';

app.use(staticServer(path.join(__dirname, 'public')));

app.use(koaBody());

app.use(koaValidate());

app.use(router);

app = app.listen(port);

module.exports = app;