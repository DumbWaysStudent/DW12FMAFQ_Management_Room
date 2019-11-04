'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    name: DataTypes.STRING


  }, {});
  rooms.associate = function (models) {
    // associations can be defined here
    rooms.hasMany(models.orders, {
      foreignKey: 'room_id',
      as: 'order',
    })
    // rooms.belongsTo(models.orders, {
    //   as: 'rooms',
    //   foreignKey: 'id'
    // });

    rooms.belongsTo(models.customers, {
      as: 'customers',
      foreignKey: 'id'
    })
  };
  return rooms;
};