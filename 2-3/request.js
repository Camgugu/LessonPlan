/**
 * Created by bian on 16-3-20.
 */
var http = require('http');
var path = require('path');
var fsWriteStream = require('fs').createWriteStream(path.join(__dirname,'./request.txt'));
var options = {
    host: 'localhost',
    path: '/index/studentData',
    port: 8080,
    method:'GET'
};

callback = function(response) {
    var str = '';
    response.pipe(fsWriteStream);
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log(str);
    });
};

http
    .request(options, callback)
    .end();