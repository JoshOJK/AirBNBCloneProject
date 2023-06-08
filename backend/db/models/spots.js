'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spots.init({
    ownderId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.VARCHAR,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    state: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    country: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name : {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    description: {
      type: DataTypes.VARCHAR,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    avgStarRating: {
      type: DataTypes.DECIMAL
    }

  }, {
    sequelize,
    modelName: 'Spots',
  });
  return Spots;
};
