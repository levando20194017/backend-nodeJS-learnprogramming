'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Enrollments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Enrollments.init({
        userID: DataTypes.INTEGER,
        courseID: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Enrollments',
    });
    return Enrollments;
};