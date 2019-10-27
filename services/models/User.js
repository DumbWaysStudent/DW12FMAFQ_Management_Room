'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined 

  };
  return User;
};