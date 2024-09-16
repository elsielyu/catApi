'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('owners', [{
      firstName: 'unit',
      lastName: 'test',
      email: 'unittest@test.com',
      },{
        firstName: 'Swing',
        lastName: 'Cat',
        email: 'swingcat@test.com',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('owners', null, {});
  }
};
