'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}




module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings'

    return queryInterface.bulkInsert(options, [
        {
       spotId: 1,
       userId: 1,
       startDate: '2023-11-19',
       endDate: '2023-12-29'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2021-1-22',
        endDate: '2021-2-12'
       },
       {
        spotId: 3,
        userId: 3,
        startDate: '2022-9-23',
        endDate: '2022-10-23'
       }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    startDate: {[op.in]: ['2023-11-19','2021-1-22', '2022-9-23']}
   });
  }
};
