'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Progress', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.INTEGER
            },
            courseID: {
                type: Sequelize.INTEGER
            },
            videoID: {
                type: Sequelize.INTEGER
            },
            total_time: {
                type: Sequelize.INTEGER
            },
            completed_time: {
                type: Sequelize.INTEGER
            },
            completionPercentage: {
                type: Sequelize.INTEGER
            },
            completed_videos: {
                type: Sequelize.INTEGER
            },
            total_videos: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Progress');
    }
};