'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John',
      email: 'example@example.com',
      password: 'test5',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Steve',
      email: 'steve@example.com',
      password: 'test22',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
