'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    options.tableName = 'SpotImages'
    const spots = await queryInterface.sequelize.query('SELECT * FROM Spots;')
const spotsId = spots[0].map((spot) => spot.id)
    return queryInterface.bulkInsert(options, [
        {
        url: 'reviewPicture1.png',
        preview: true,
        spotId: spotsId[0]
      },
      {
        url: 'reviewPicture2.png',
        preview: false,
        spotId: spotsId[1]
      },
      {
        url: 'reviewPicture3.png',
        preview: true,
        spotId: spotsId[2]
      }

    ], {});

  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'SpotImages';
    const op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    url: {[op.in]: ['reviewPicture1.png','reviewPicture2.png','reviewPicture3.png']}
   });
  }
};
