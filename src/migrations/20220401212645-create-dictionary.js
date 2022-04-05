'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dictionaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING(3)
      },
      trieJSON: {
        type: Sequelize.JSON
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dictionaries');
  }
};