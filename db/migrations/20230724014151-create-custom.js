"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shape: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      theme: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      iconSM: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      font: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      border: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Customs");
  },
};
