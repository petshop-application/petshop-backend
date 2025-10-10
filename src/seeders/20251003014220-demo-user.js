'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        perfil: 'admin',
        cpf: '12345678900',
        password: '$2b$10$Z/8EvNlwLI3OTBL3MUker.9avSF43jIn5MTBGWU8IH2DwNvDB2ZDu'
      },
      {
        name: 'Jane Smith',
        perfil: 'client',
        cpf: '11111111111',
        password: '$2b$10$al6NhXw74BBSiJcUN21ah.ne/ltc6TCrPJt2M00f9YgEnY..DfDfW'
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
