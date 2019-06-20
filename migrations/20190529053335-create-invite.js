'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invites', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      property_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'properties',
          key: 'id'
        }
      },
      inviter_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_admin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      accepted_at: {
        type: Sequelize.DATE
      },
      accepted_id: {
        type: Sequelize.UUID,
        references: {
          model: 'memberships',
          key: 'id'
        }
      },
      revoked_at: {
        type: Sequelize.DATE
      },
      revoker_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('invites', {
      fields: ['property_id'],
      name: 'invites_property_id_idx'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invites');
  }
};
