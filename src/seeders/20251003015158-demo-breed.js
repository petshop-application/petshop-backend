'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('breeds', [
      {
        description: 'Golden Retriever',
      },
      {
        description: 'Labrador',
      },
      {
        description: 'Bulldog',
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('breeds', null, {});

  }
};
