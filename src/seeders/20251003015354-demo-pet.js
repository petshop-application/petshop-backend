'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('pets', [{
      client_id: 1,
      breed_id: 1,
      birthday: new Date('2020-01-01'),
      name: 'Buddy',
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('pets', null, {});

  }
};
