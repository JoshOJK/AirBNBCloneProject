'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    options.tableName = 'SpotImages'

    return queryInterface.bulkInsert(options, [
        {
        url: 'https://asset.mansionglobal.com/editorial/san-francisco-s-victorians--small-in-number--high-in-history-and-beauty/assets/6KUTkIzKR0/sr_sf_lead-2560x2560.jpeg',
        preview: true,
        spotId: 1
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixOlCi13Zl_OTVhAUCesLnQpuN71_cUdvqQ&usqp=CAU',
        preview: true,
        spotId: 2
      },
      {
        url: 'https://cdn.decoist.com/wp-content/uploads/2014/06/Classic-brick-exterior-of-the-Downing-Street-house-kept-intact.jpg',
        preview: true,
        spotId: 3
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
