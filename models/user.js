'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [/^[a-z0-9_\-]+$/i],
          msg: 'Invalid username: min 3 letters, numbers, -, or _'
        },
        len: {
          args: [3, 30],
          msg: 'Invalid username: min 3 letters, numbers, -, or _'
        }
      }
    },
    hashed_password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
