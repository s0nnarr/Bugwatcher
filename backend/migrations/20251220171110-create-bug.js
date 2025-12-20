'use strict';
/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: ""
      },
      severity: {
        type: Sequelize.ENUM("Low", "Medium", "High", "Critical"),
        allowNull: false
      },
      priority: {
        type: Sequelize.ENUM("Low", "Medium", "High"),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"),
        allowNull: false,
        defaultValue: "OPEN"
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      assignedUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
  }

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bugs');
  }
