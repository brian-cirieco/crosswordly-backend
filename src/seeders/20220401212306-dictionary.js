'use strict';

const { Dictionary } = require("../models");
const populateTrie = require("../helpers/populateTrie");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    try {
      await populateTrie().then(async result => {
        return Dictionary.create({ language: "en", trieJSON: result.toJSON() });
      });
    } catch (err) {
      console.error(err);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("dictionaries", null, {});
  }
};
