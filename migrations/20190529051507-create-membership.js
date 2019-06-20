'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('memberships', {
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
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      is_admin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    .then(() => queryInterface.addIndex('memberships', {
      fields: ['property_id', 'user_id'],
      unique: true,
      where: { revoked_at: null },
      name: 'memberships_property_id_and_user_id_idx'
    }))
    .then(() => queryInterface.addIndex('memberships', {
      fields: ['user_id'],
      name: 'memberships_user_id_idx'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('memberships');
  }
};
