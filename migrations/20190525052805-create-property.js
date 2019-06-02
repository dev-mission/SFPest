'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()')
      },
      url_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      street_names: {
        allowNull: false,
        type: Sequelize.JSONB
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
      confirmation: {
        allowNull: false,
        type: Sequelize.TEXT
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
    .then(() => queryInterface.addIndex('properties', {
      fields: [Sequelize.fn('lower', Sequelize.col('name'))],
      unique: true,
      name: 'properties_name_idx'
    }))
    .then(() => queryInterface.addIndex('properties', {
      fields: [Sequelize.fn('lower', Sequelize.col('url_id'))],
      unique: true,
      name: 'properties_url_id_idx'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('properties');
  }
};
