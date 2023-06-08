'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownderId: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.VARCHAR,
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.VARCHAR,
        allowNull: false
      },
      state: {
        type: Sequelize.VARCHAR,
        allowNull: false
      },
      country: {
        type: Sequelize.VARCHAR,
        allowNull: false
      },
      lat: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lng: {
        allowNull: false
      },
      name : {
        type: Sequelize.VARCHAR,
        allowNull: false
      },
      description: {
        type: Sequelize.VARCHAR,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      avgStarRating: {
        type: Sequelize.DECIMAL
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
