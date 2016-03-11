/**
 * Created by li-rz on 16-3-7.
 */
var Sequelize = require('sequelize');
var dataType = Sequelize;

var String = (num, allow_null) => {
    if (!num) {
        num = 2048;
    }

    if (!allow_null) {
        allow_null = false;
    }

    return {
        type : dataType.STRING(num),
        allow_null
    }
};

var Double = (default_value) => {
    if (typeof default_value === 'undefined') {
        default_value = 0;
    }

    return {
        type: dataType.DOUBLE,
        default_value
    }
};

var Int = (default_value) => {
    if (typeof default_value === 'undefined') {
        default_value = 0;
    }

    return {
        type: dataType.INTEGER,
        default_value
    }
};

var Url = () => {
    return {
        type: dataType.STRING,
        allowNull: false,
        vialidate : {
            isUrl: true
        }
    }
};

var Date = () => {
    return {
        type: dataType.DATE,
        default_value: Sequelize.NOW
    }
};


module.exports = {
    DataTypes : {
        String,
        Double,
        Int,
        Url,
        Date
    }
};