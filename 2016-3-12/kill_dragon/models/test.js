/**
 * Created by li-rz on 16-3-8.
 */

var sequelizex = require('../lib/sequelizex'),
    data_type = sequelizex.DataTypes;

module.exports = function (sequelize, DataTypes) {
    var Test = sequelize.define('Test', {
        title : data_type.String(),
        username: data_type.String(),
        time: data_type.Date(),
        password: data_type.String()
    });

    return Test;
};