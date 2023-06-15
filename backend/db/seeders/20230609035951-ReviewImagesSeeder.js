'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    options.tableName = 'ReviewImages'

    return queryInterface.bulkInsert(options, [
        {
        url: 'spotPicture1.png',
        reviewId: 1
      },
      {
        url: 'spotPicture2.png',
        reviewId: 2
      },
      {
        url: 'spotPicture3.png',
        reviewId: 3
      }

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    url: {[op.in]: ['spotPicture1.png','spotPicture2.png','spotPicture3.png']}
   });
  }
};
