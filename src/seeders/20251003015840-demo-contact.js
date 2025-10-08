'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('contacts', [{
      client_id: 1,
      type: 'email',
      tag: 'personal',
      value: 'teste@teste.com.br'
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('contacts', null, {});

  }
};
