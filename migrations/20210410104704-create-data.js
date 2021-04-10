'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      atLike: {
        type: Sequelize.INTEGER
      },
      region: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.STRING
      },
      tag1: {
        type: Sequelize.STRING
      },
      tag2: {
        type: Sequelize.STRING
      },
      tag3: {
        type: Sequelize.STRING
      },
      tag4: {
        type: Sequelize.STRING
      },
      tag5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Data');
  }
};