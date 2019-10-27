'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    name: DataTypes.STRING,
    id_card: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};