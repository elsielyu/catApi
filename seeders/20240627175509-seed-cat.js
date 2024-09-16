'use strict';

/** @type {import('sequelize-cli').Migration} */
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
   const filename = 'C:\\postgresFiles\\cuteCat.jpg';
   return queryInterface.bulkInsert('cats', [{
      name: 'cuteCat',
      image: Sequelize.fn('pg_read_binary_file', filename),
      message: 'i haz the cutest kitteh eva !!',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('cats', null, {});
  }
};
