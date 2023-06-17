'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {foreignKey: 'ownerId',
         as: "Owner"}
      ),
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId',
        onDelete: "CASCADE",
        hooks: true,}
      )
      Spot.hasMany(
        models.SpotImage,
        {
      foreignKey: 'spotId',
      onDelete: "CASCADE",
      hooks: true,
    }
      ),
      Spot.hasOne(
        models.Booking,
        {foreignKey: 'spotId',
        onDelete: "CASCADE",
        hooks: true,}
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,

    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,

    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,

    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,

    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,

    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,

    },
    name : {
      type: DataTypes.STRING(50),
      allowNull: false,

    },
    description: {
      type: DataTypes.STRING(50),

    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,


    },
    avgRating: {
      type: DataTypes.DECIMAL
    }

  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
