'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE,
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
    orders.belongsTo(models.rooms, {
      as: 'room',
      foreignKey: 'room_id'
    })
    orders.belongsTo(models.customers, {
      as: 'customer',
      foreignKey: 'customer_id'
    })
  };
  return orders;
};