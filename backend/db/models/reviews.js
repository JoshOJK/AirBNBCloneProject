'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      ),
        Review.belongsTo(
          models.User,
          { foreignKey: 'userId' }
        ),
        Review.hasMany(
          models.ReviewImage,
          {
            foreignKey: 'reviewId',
            onDelete: 'CASCADE',
            hooks: true
          }
        )
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNull(value) {
          if(!value) {
            throw new Error("Review text is required")
          }
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isMinMax(value)  {
          if(value > 5 || value < 1) {
            throw new Error("Stars must be an integer from 1 to 5")

          }
        }
      }
    },

  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
