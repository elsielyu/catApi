'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'cats',
          'available',
          {
            type: DataTypes.BOOLEAN,
          },
          { t },
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.sequelize.transaction(t => {
    return Promise.all([
      queryInterface.removeColumn(
        'cats',
        'available',
        { t },
      ),
    ]);
   });
  }
};
