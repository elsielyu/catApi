'use strict';
const fs = require('node:fs');
const folderName = 'C:\\postgresFiles\\';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isFile = fileName => {
      return fs.lstatSync(fileName).isFile();
    };

    const files = fs.readdirSync(folderName).map(fileName => {
      return folderName.concat(fileName);
    })
    .filter(isFile);

    const catsData = [];
    for (let i = 0; i < files.length; i++) {
      const nameOfCat = files[i].split('\\')[2].split('.')[0];
      const entry = {
        name: nameOfCat,
        image: Sequelize.fn('pg_read_binary_file', files[i]),
        available: true,
      };
      catsData.push(entry);
    }
    await queryInterface.bulkInsert('cats', catsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cats', null, {});
  }
};
