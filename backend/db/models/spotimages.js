'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(
        models.Spot,
        {foreignKey: 'spotId',
        onDelete: 'cascade'
      }
      )
    }
  }
  SpotImage.init({
    url: {
      type: DataTypes.STRING(1234)
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
