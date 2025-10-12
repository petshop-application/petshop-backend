'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('clients', [
      {
        name: 'Jane Smith',
        cpf: '98765432100',
        created_at: new Date(),
      },
      {
        name: 'Kate Williams',
        cpf: '11111111100',
        created_at: new Date(),
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('clients', null, {});

  }
};
