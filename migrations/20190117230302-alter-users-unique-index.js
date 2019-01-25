'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeConstraint('Users', 'Users_username_key').then(function() {
      return queryInterface.addIndex('Users', {
        fields: [Sequelize.fn('lower', Sequelize.col('username'))],
        unique: true,
        name: 'Users_username_idx'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeIndex('Users', 'Users_username_idx').then(function() {
      return queryInterface.addConstraint('Users', ['username'], {
        type: 'unique',
        name: 'Users_username_key'
      });
    });
  }
};
