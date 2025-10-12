'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        perfil: 'admin',
        cpf: '12345678900',
        password: '$2b$10$zJbKGOhyVEVWiYMkvsw6YeTZq3T75NKJcHsRB27XXZ3p98qFeAX.6'
      },
      {
        name: 'Jane Smith',
        perfil: 'client',
        cpf: '98765432100',
        password: '$2b$10$qHyANPXAg8Mgls/EFQedp.XnXpouNFbbxYmoVqU4HEE6LqjgsBqIe'
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
