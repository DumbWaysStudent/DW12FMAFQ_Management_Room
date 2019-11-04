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
    return queryInterface.bulkInsert('users', [
      {
        email: 'noorqidam@gmail.com',
        password: '123',
        name: 'Qidam',
        image: 'https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-user-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_975597.jpg'
      },
      {
        email: 'aa@a.com',
        password: 'aa',
        name: 'anonim',
        image: 'https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-user-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_975597.jpg'
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
    return queryInterface.bulkDelete('users', null, {});
  }
};
