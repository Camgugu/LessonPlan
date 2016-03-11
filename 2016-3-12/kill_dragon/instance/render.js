/**
 * Created by li-rz on 16-3-8.
 */
var coViews = require('co-views');

var root = require('./config.js').root;
var viewPath = root + '/views';

var render = coViews(viewPath, {
    map: {
        html: 'jade'
    },
    locals: {
        root: viewPath
    }
});

module.exports = render;
