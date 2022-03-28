'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('words', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "word must be included" },
          notEmpty: { msg: "word cannot not be an empty string" }
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Words');
  }
};