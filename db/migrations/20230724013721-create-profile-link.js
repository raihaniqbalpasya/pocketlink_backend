"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProfileLinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profileImage: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      backgroundImage: {
        type: Sequelize.STRING,
      },
      designPattern: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      socialMedia: {
        allowNull: false,
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("ProfileLinks");
  },
};
