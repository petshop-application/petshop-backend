'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'client_id',
        references: {
          model: 'clients',
          key: 'id',
        },
      },
      breedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'breed_id',
        references: {
          model: 'breeds',
          key: 'id',
        },
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};