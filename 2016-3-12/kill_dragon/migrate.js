/**
 * Created by li-rz on 16-3-10.
 */
var db = require('./models/index');
var co = require('co');


co(function *() {
    yield db.sync({force: true});
    console.log('finished');
});