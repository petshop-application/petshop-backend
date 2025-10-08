'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('treatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'pet_id',
        references: {
          model: 'pets',
          key: 'id',
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('treatments');
  }
};