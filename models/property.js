'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    urlId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'url_id',
      validate: {
        is: {
          args: [/^[a-z0-9\-]+$/],
          msg: 'URL ID is lowercase letters, numbers, and hypen only'
        },
        notNull: {
          msg: 'URL ID cannot be blank'
        },
        notEmpty: {
          msg: 'URL ID cannot be blank'
        }
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Name cannot be blank'
        },
        notEmpty: {
          msg: 'Name cannot be blank'
        }
      }
    },
    streetNames: {
      allowNull: false,
      type: DataTypes.JSONB,
      field: 'street_names',
      validate: {
        notNull: {
          msg: 'Street Names cannot be blank'
        },
        notEmpty: {
          msg: 'Street Names cannot be blank'
        }
      }
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'City cannot be blank'
        },
        notEmpty: {
          msg: 'City cannot be blank'
        }
      }
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'State cannot be blank'
        },
        notEmpty: {
          msg: 'State cannot be blank'
        }
      }
    },
    postalCode: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Postal code cannot be blank'
        },
        notEmpty: {
          msg: 'Postal code cannot be blank'
        }
      }
    },
    confirmation: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: 'Confirmation text cannot be blank'
        },
        notEmpty: {
          msg: 'Confirmation text cannot be blank'
        }
      }
    },
  }, {
    tableName: 'properties',
    underscored: true
  });
  Property.associate = function(models) {
    // associations can be defined here
    Property.hasMany(models.Report, {as: 'reports'});
    Property.hasMany(models.Membership, {as: 'memberships'});
  };
  sequelizePaginate.paginate(Property)
  return Property;
};
