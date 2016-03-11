/**
 * Created by li-rz on 16-3-7.
 */
var path = require('path'),
    fs = require('fs');

module.exports = {
    db : {
        name : 'mysql',
        username : 'root',
        password : 'erfvgt',
        host : '127.0.0.1',
        port : 3306,
        database : 'kill_dragon',
        toString() {
            return `${this.name}://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
        }
    },
    root : __dirname + '/../'
};