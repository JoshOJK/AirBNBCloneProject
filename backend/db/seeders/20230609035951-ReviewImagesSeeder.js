'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    options.tableName = 'ReviewImages'
    const reviews = await queryInterface.sequelize.query('SELECT * FROM Reviews;')
    const reviewId = reviews[0].map((review) => review.id)
    return queryInterface.bulkInsert(options, [
        {
        url: 'spotPicture1.png',
        reviewId: reviewId[0]
      },
      {
        url: 'spotPicture2.png',
        reviewId: reviewId[1]
      },
      {
        url: 'spotPicture3.png',
        reviewId: reviewId[2]
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
