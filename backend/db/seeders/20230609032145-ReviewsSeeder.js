'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface, Sequelize) =>  {

    options.tableName = 'Reviews'
    const users = await queryInterface.sequelize.query("SELECT * FROM Users;")
const userId = users[0].map((user) => user.id)
const spots = await queryInterface.sequelize.query('SELECT * FROM Spots;')
const spotsId = spots[0].map((spot) => spot.id)

    return queryInterface.bulkInsert(options, [
      {
      userId: 1,
      spotId: 1,
      review: 'Place was a mess horrible view and a weird smell',
      stars: 1
    },
    {
      userId: 2,
      spotId: 2,
     review: 'Great place very clean i loved it',
     stars: 5
     },
     {
      userId: 3,
      spotId: 3,
      review: 'Was pretty mid not a lot to do not a lot to see',
      stars: 3
     }
  ], {});

  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Reviews';
    const op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    review: {[op.in]: ['Was pretty mid not a lot to do not a lot to see','Great place very clean i loved it', 'Place was a mess horrible view and a weird smell']}
   });
  }
};
