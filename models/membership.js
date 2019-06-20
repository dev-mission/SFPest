'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    isAdmin: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
      field: 'is_admin'
    },
    revokedAt: {
      type: DataTypes.DATE,
      field: 'revoked_at',
    }
  }, {
    tableName: 'memberships',
    underscored: true,
  });
  Membership.associate = function(models) {
    // associations can be defined here
    Membership.belongsTo(models.Property, {as: 'property'});
    Membership.belongsTo(models.User, {as: 'user'});
    Membership.belongsTo(models.User, {as: 'revoker'});
  };
  sequelizePaginate.paginate(Membership);
  return Membership;
};
