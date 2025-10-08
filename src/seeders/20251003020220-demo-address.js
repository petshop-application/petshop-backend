'use strict';

const client = require('../models/client');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('addresses', [{
      client_id: 1,
      street: '123 Main St',
      city: 'Springfield',
      neighborhood: 'Downtown',
      complement: 'Apt 4B',
      tag: 'home',
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('addresses', null, {});

  }
};
