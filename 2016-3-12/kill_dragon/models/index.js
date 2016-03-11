/**
 * Created by li-rz on 16-3-7.
 */
var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    config = require('./../instance/config.js'),
    sequelize;

sequelize = new Sequelize(config.db.toString());

fs.readdirSync(__dirname)
    .filter(function (file_name) {
        return file_name.indexOf('.') !== 0 && file_name !== 'index.js';
    })
    .forEach(function (file_name) {
        try {
            sequelize.import(path.join(__dirname, file_name));
        } catch (error) {

        }
    });

// var models = sequelize.models;

module.exports = sequelize;
