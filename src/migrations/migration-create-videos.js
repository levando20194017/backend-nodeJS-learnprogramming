'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Videos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lessonID: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            video_url: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.STRING
            },
            orderBy: {
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
        await queryInterface.dropTable('Videos');
    }
};