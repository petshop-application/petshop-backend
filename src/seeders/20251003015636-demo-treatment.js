'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('treatments', [{
      pet_id: 1,
      description: 'Regular Checkup',
      date: new Date(),
      cost: 100.00
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('treatments', null, {});

  }
};
