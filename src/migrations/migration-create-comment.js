'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            postID: {
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT
            },
            img_url: {
                type: Sequelize.STRING
            },
            DATE: {
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
        await queryInterface.dropTable('Comment');
    }
};