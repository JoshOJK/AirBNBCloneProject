'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.belongsTo(
        models.Spots,
        {foreignKey: 'spotId'}
      ),
      Reviews.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      ),
      Reviews.hasMany(
        models.ReviewImages,
        {foreignKey: 'reviewId'}
      )
    }
  }
  Reviews.init({
    userId: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.VARCHAR,
      allowNull: false
    },
    starts: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
