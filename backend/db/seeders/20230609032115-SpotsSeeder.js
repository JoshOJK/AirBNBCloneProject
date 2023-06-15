'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';


    return queryInterface.bulkInsert(options, [
        {
          ownerId: 1,
          address: '2454 Dienda Way',
          city: 'Vikendi',
          state: 'California',
          country: 'United Nations',
          lat: 12.453,
          lng: 56.676,
          name: 'Candice Mansion be any better',
          description: 'A great place to discover disareal',
          price: 5000
      },
      {
        ownerId: 2,
        address: '54625 Sanhok Way',
        city: 'Ezreal',
        state: 'Illinois',
        country: 'United Nations',
        lat: 19.163,
        lng: 36.578,
        name: 'Final Destination',
        description: 'A great ending to your story',
        price: 4500
    },
    {
      ownerId: 3,
      address: '42 St',
      city: 'New York',
      state: 'New York',
      country: 'United Nations',
      lat: 58.643,
      lng: 12.936,
      name: 'Times Square Resort',
      description: 'The best times square view in New York',
      price: 10000
  }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    address: {[op.in]: ['42 St','54625 Sanhok Way', '2454 Dienda Way']}
   });

  }
};
