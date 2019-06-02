'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      what: {
        allowNull: false,
        type: Sequelize.STRING
      },
      other: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.TEXT
      },
      picture_url: {
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      street_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      street_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unit_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postal_code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      property_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'properties',
          key: 'id'
        }
      }
    })
    .then(() => queryInterface.addIndex('reports', {
      fields: ['property_id'],
      name: 'reports_property_id_idx'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reports');
  }
};
