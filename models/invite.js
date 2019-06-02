'use strict';

const mailer = require('../emails/mailer');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define('Invite', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'first_name',
      validate: {
        notNull: {
          msg: 'First name cannot be blank'
        },
        notEmpty: {
          msg: 'First name cannot be blank'
        }
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'last_name',
      validate: {
        notNull: {
          msg: 'Last name cannot be blank'
        },
        notEmpty: {
          msg: 'Last name cannot be blank'
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Email cannot be blank'
        },
        notEmpty: {
          msg: 'Email cannot be blank'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_admin',
    },
    acceptedAt: {
      type: DataTypes.DATE,
      field: 'accepted_at'
    },
    revokedAt: {
      type: DataTypes.DATE,
      field: 'revoked_at'
    },
  }, {
    tableName: 'invites',
    underscored: true,
  });
  Invite.associate = function(models) {
    // associations can be defined here
    Invite.belongsTo(models.User, {as: 'inviter'});
    Invite.belongsTo(models.User, {as: 'revoker'});
    Invite.belongsTo(models.Membership, {as: 'accepted'});
    Invite.belongsTo(models.Property, {as: 'property'});

    Invite.afterCreate(function(invite, options) {
      invite.getProperty().then(function(property) {
        mailer.send({
          template: 'invite',
          message: {
            to: `${invite.firstName} ${invite.lastName} <${invite.email}>`
          },
          locals: {
            property: property,
            url: `${process.env.BASE_URL}/invites/${invite.id}`
          }
        }).then(function(response) {

        }).catch(function(error) {
          console.log(error);
        });
      });
    });

    Invite.prototype.acceptBy = function(user) {
      return sequelize.transaction(t => {
        return models.Membership.create({
          isAdmin: this.isAdmin,
          userId: user.id,
          propertyId: this.propertyId
        }, {transaction: t}).then(membership => {
          return this.update({
            acceptedAt: Date.now(),
            acceptedId: membership.id
          }, {transaction: t});
        });
      });
    }
  };
  sequelizePaginate.paginate(Invite);
  return Invite;
};
