'use strict';

const _ = require('lodash');
const sequelizePaginate = require('sequelize-paginate')
const mailer = require('../emails/mailer');

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    what: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please choose from the list'
        },
        notEmpty: {
          msg: 'Please choose from the list'
        }
      }
    },
    other: {
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: 'Please describe where you saw it'
        },
        notEmpty: {
          msg: 'Please describe where you saw it'
        }
      }
    },
    pictureUrl: {
      type: DataTypes.STRING,
      field: 'picture_url',
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        },
        notEmpty: {
          msg: 'Please enter your name'
        }
      }
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [/^[0-9]{10}$/],
          msg: 'Please enter your phone with area code'
        }
      }
    },
    streetNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'street_number',
      validate: {
        notNull: {
          msg: 'Please enter your street number'
        },
        notEmpty: {
          msg: 'Please enter your street number'
        }
      }
    },
    streetName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'street_name',
      validate: {
        notNull: {
          msg: 'Please enter your street name'
        },
        notEmpty: {
          msg: 'Please enter your street name'
        }
      }
    },
    unitNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'unit_number',
      validate: {
        notNull: {
          msg: 'Please enter your unit number'
        },
        notEmpty: {
          msg: 'Please enter your unit number'
        }
      }
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please enter your city'
        },
        notEmpty: {
          msg: 'Please enter your city'
        }
      }
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Please enter your state'
        },
        notEmpty: {
          msg: 'Please enter your state'
        }
      }
    },
    postalCode: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'postal_code',
      validate: {
        notNull: {
          msg: 'Please enter your postal code'
        },
        notEmpty: {
          msg: 'Please enter your postal code'
        }
      }
    },
  }, {
    tableName: 'reports',
    underscored: true,
    validate: {
      whatOther() {
        if (this.what == 'other' && (this.other == null || this.other.trim() == '')) {
          throw new Error('Please describe the pest');
        }
      }
    }
  });
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Property, {as: 'property'});

    Report.afterCreate(function(report, options) {
      report.getProperty({
        include: [{model: models.Membership, as: 'memberships', where: {revokedAt: null}, include: [{model: models.User, as: 'user'}]}]
      }).then(function(property) {
        mailer.send({
          template: 'report',
          message: {
            to: _.map(property.memberships, m => `${m.user.firstName} ${m.user.lastName} <${m.user.email}>`)
          },
          locals: {
            property: property,
            url: `${process.env.BASE_URL}/admin/reports/${report.id}`
          }
        }).then(function(response) {

        }).catch(function(error) {
          console.log(error);
        });
      });
    });
  };
  sequelizePaginate.paginate(Report)
  return Report;
};
