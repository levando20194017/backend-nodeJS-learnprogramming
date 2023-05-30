'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Post', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            img_url: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            timeType: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Post');
    }
};