'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}




module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings'
    const users = await queryInterface.sequelize.query("SELECT * FROM Users;")
    const userId = users[0].map((user) => user.id)
    const spots = await queryInterface.sequelize.query('SELECT * FROM Spots;')
    const spotsId = spots[0].map((spot) => spot.id)
    return queryInterface.bulkInsert(options, [
        {
       spotId: spotsId[0],
       userId: userId[0],
       startDate: '2023-11-19',
       endDate: '2023-12-29'
      },
      {
        spotId: spotsId[1],
        userId: userId[1],
        startDate: '2021-1-22',
        endDate: '2021-2-12'
       },
       {
        spotId: spotsId[2],
        userId: userId[2],
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
