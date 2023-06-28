'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Progresses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Progresses.init({
        // userID: DataTypes.STRING,
        userID: DataTypes.INTEGER,
        courseID: DataTypes.INTEGER,
        videoID: DataTypes.INTEGER,
        total_time: DataTypes.INTEGER,
        completed_time: DataTypes.INTEGER,
        completionPercentage: DataTypes.INTEGER,
        completed_videos: DataTypes.INTEGER,
        total_videos: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Progresses',
    });
    return Progresses;
};