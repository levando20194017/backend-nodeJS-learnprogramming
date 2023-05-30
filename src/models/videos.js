'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Videos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Videos.init({
        lessonID: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        video_url: DataTypes.STRING,
        duration: DataTypes.STRING,
        orderBy: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Videos',
    });
    return Videos;
};