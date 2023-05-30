'use strict';

// email: DataTypes.STRING,
// password: DataTypes.STRING,
// fullName: DataTypes.STRING,
// address: DataTypes.STRING,
// gender: DataTypes.BOOLEAN,
// phoneNumber: DataTypes.STRING,
// img_url: DataTypes.STRING,
// role: DataTypes.STRING

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      fullName: 'Admin',
      address: '46 ngõ 61 Định Công',
      gender: 1,
      role: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
