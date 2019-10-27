'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    customer_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE,
    is_done : DataTypes.BOOLEAN
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.customers,{
      as : 'customers',
      foreignKey : 'customer_id'
    }),
    orders.belongsTo(models.rooms,{
      as : 'rooms',
      foreignKey : 'room_id'
    })

  };
  return orders;
};