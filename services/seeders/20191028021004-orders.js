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
    return queryInterface.bulkInsert('orders', [
      {
        customer_id: 1,
        room_id: 1,
        is_done: true,
        is_booked: false,
        duration: 10,
        order_end_time: '2019-10-26T05:31:08.000Z'
      },
      {
        customer_id: 2,
        room_id: 2,
        is_done: false,
        is_booked: true,
        duration: 15,
        order_end_time: '2019-10-26T05:31:08.000Z'
      },
      {
        customer_id: 3,
        room_id: 3,
        is_done: true,
        is_booked: false,
        duration: 20,
        order_end_time: '2019-10-26T05:31:08.000Z'
      },
      {
        customer_id: 4,
        room_id: 4,
        is_done: false,
        is_booked: true,
        duration: 25,
        order_end_time: '2019-10-26T05:31:08.000Z'
      },
      {
        customer_id: 5,
        room_id: 5,
        is_done: false,
        is_booked: true,
        duration: 25,
        order_end_time: '2019-10-26T05:31:08.000Z'
      },
      {
        customer_id: 6,
        room_id: 6,
        is_done: true,
        is_booked: false,
        duration: 20,
        order_end_time: '2019-10-26T05:31:08.000Z'
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
    return queryInterface.bulkDelete('orders', null, {});
  }
};
