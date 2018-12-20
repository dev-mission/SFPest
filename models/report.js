'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    what: DataTypes.STRING,
    location: DataTypes.TEXT,
    pictureUrl: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    streetName: DataTypes.STRING,
    unitNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
  };
  return Report;
};
