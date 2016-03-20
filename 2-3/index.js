/**
 * Created by bian on 16-3-20.
 */
/**
 * Nodejs 基础--网络基础知识
 * */
//端口：
//主机地址：
//套接字socket
//A是用户，B是用户，C是用户，D是服务方












/**
 * Nodejs 基础--流
 * */
/**
 * 可读流是你能从那里拿到数据，你是被动方
 * 比如打开了一个文件然后你读这个文件，你能得到内容的流就叫可读流
 *
 * 可写流是你需要往里面写入然后处理数据的流，你是主动方
 * 比如你现在有一堆数据，你就需要通过可写流把它们保存到磁盘上
 * */

//var stream = require('stream');
//var path = require('path');
//var fs = require('fs');
//
//var readStream = stream.Readable();
//var oldfilepath = path.join(__dirname,'./hello.txt');
//var newfilepath = path.join(__dirname,'./hello2.txt');
//var oldTxtData = '';
//var fsReadStream = fs.createReadStream(oldfilepath);
//var fsWriteStream = fs.createWriteStream(newfilepath);

//fsReadStream.on('open',function(){
//    console.log('opened');
//    //fsReadStream.pipe(fsWriteStream);
//});
//fsReadStream.on('data',function(chunk){
//    console.log('have data');
//    fsWriteStream.write(chunk);
//});
//fsReadStream.on('end',function(){
//    fsWriteStream.end();
//});

//var buffer = new Buffer('hello,this is a test','utf8');
//readStream.on('data', function(chunk) {
//    console.log( chunk);
//});
//readStream.on('end',function() {
//    console.log('end');
//});
//var sizeTotal = 0;
////必须先声明这个_read
//readStream._read = function(size){
//    console.log(size);
//    sizeTotal += size;
//    if(sizeTotal > 20000){
//        readStream.push(null);
//    }
//};
//readStream.push(buffer);
//
//fsWriteStream.on('pipe',function (){
//    console.log('a reader stream pipe to me');
//});
//readStream.pipe(fsWriteStream);




/**
 * Nodejs 基础--创建tcp服务器
 * */
//var net =require('net');
//var sockets = [];
//var server = net.createServer(function(socket){
//});
//
//server.on('connection',function(socket){
//    console.log('a new connection');
//    sockets.push(socket);
//
//    socket.on('data',function(data){
//        for(var x in sockets){
//            sockets[x].write(data);
//        }
//    });
//
//    socket.on('close',function(){
//        sockets.splice(sockets.indexOf(socket),1);
//        console.log('connection bye bye');
//    });
//});
//
//server.listen({
//    host:'localhost',
//    port:8000,
//    exclusive:false
//});

/**
 * Nodejs 基础--论http静态和动态服务器
 * */

//静态文件服务器
//var http = require("http");
//var fs = require("fs");
//var path = require("path");
//var url = require("url");
//
//var server = http.createServer(function(req, res) {
//    var pathname = url.parse(req.url).pathname;
//    console.log(pathname);
//    var filepath = path.join(__dirname,pathname);
//    console.log(filepath);
//    var stream = fs.createReadStream(filepath,{encoding:'utf8'});
//    stream.on("error", function() {
//        res.writeHead(404);
//        res.end();
//    });
//    stream.pipe(res);
//});
//server.on("error", function(error) {
//    console.log(error);
//});
//server.listen(8080,function(){
//    console.log('server listen on 8080');
//});

//动态路径服务器
//var http = require("http");
//var url = require("url");
//var server = http.createServer(function(req,res){
//    var pathname = url.parse(req.url).pathname;
//    console.log(pathname);
//    if(pathname == '/public/test.txt'){
//        res.setHeader('Content-Type', 'text/html');
//        res.setHeader('X-Foo', 'bar');
//        res.writeHead(200, {'Content-Type': 'text/plain'});
//        res.write('how are you?');
//        res.end('hello world');
//    }else if(pathname == '/index/studentData'){
//        res.end('here are students datas');
//    }else{
//        res.end('404');
//    }
//});
//
//server.on("error", function(error) {
//    console.log(error);
//});
//
//server.listen(8080,function(){
//    console.log('server listen on 8080');
//});
/**
 * 下次：Nodejs的代码风格的进化史和一些坑
 * */