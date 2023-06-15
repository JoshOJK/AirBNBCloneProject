'use strict';
const { DECIMAL } = require("sequelize");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Spots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      name : {
        type: Sequelize.STRING(50),
        allowNull: false,
        notEmpty: true,
      },
      description: {
        type: Sequelize.STRING(50),
        notEmpty: true,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        notEmpty: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      avgStarRating: {
        type: Sequelize.DECIMAL
      }
    },
    options
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  },
};
