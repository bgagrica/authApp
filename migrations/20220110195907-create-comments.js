'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      blogId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      likes: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      dislikes: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};