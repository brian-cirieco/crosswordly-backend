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

    await populateTrie().then(async result => {
      return Dictionary.create({ id: 1, trieJSON: result.toJSON() });
    });
    
    // await queryInterface.bulkInsert('dictionary', [{ trieJSON: trie.toJSON() }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('dictionary', null, {});
  }
};
