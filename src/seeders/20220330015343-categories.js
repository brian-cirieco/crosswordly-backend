'use strict';

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
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: "noun" },
      { id: 2, name: "pronoun" },
      { id: 3, name: "verb" },
      { id: 4, name: "adjective" },
      { id: 5, name: "adverb" },
      { id: 6, name: "preposition" },
      { id: 7, name: "conjunction" },
      { id: 8, name: "interjection" }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('categories', null, {});
  }
};
