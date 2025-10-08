'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        perfil: 'admin',
        cpf: '12345678900',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        perfil: 'client',
        cpf: '111111111111',
        password: 'password123'
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
