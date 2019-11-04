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
    return queryInterface.bulkInsert('customers', [
      {
        name: 'Rizky Fadhillah',
        id_card: '3175120703950009',
        phone_number: '08980881665',
        image: 'https://media.licdn.com/dms/image/C5603AQH28yE4SmMy8w/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=Nz2CfmgI_ukKAGewRaLxfYvgDz_FQwOX5Qw62yfVXZ0'
      },
      {
        name: 'Irvan Refnaldy',
        id_card: '3174131505990009',
        phone_number: '082176868929',
        image: 'https://media.licdn.com/dms/image/C5603AQFDK6OC4vt-_w/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=vXe_zhRO_apfCFs9ECxvl73KE0slcPRoiywoX2LigdA'
      },
      {
        name: 'Khairunnas',
        id_card: '3371600811970123',
        phone_number: '085373521870',
        image: 'https://media.licdn.com/dms/image/C5103AQEjFQqKEmX3eA/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=93HrCfvBIZuzcZlWzFqo3bA5POK5quDbUaEkbD6Uj3E'
      },
      {
        name: 'Omdy',
        id_card: '3191899937790006',
        phone_number: '081246464195',
        image: 'https://png.pngtree.com/png-vector/20190423/ourmid/pngtree-user-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_975597.jpg'
      },
      {
        name: 'Dian Prasetyo',
        id_card: '3887089777944589',
        phone_number: '082288360129',
        image: 'https://media.licdn.com/dms/image/C5603AQGd0Sb1ogwL5Q/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=0YyHRc-Le-UPKAjj5TTnRA5jA1aeYL-ohJirSkoj7r8'
      },
      {
        name: 'Fikario Yaputtra',
        id_card: '121361361969',
        phone_number: '082244672429',
        image: 'https://media.licdn.com/dms/image/C4E03AQEi99qqDFxoMg/profile-displayphoto-shrink_200_200/0?e=1577923200&v=beta&t=rGkp6M4D2Q-dfDvCduVaiMqto3_H4dLchoaS4Mudq4A'
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
    return queryInterface.bulkDelete('customers', null, {});
  }
};
