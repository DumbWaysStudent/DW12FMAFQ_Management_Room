'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('rooms', [
      {
        name: 'A1'
      },
      {
        name: 'A2'
      },
      {
        name: 'A3'
      },
      {
        name: 'B1'
      },
      {
        name: 'B2'
      },
      {
        name: 'B3'
      },
      {
        name: 'B4'
      },
      {
        name: 'C1'
      },
      {
        name: 'C2'
      },
      {
        name: 'C3'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
