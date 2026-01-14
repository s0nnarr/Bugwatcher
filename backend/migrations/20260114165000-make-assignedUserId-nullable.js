'use strict';
/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  // Make assignedUserId nullable so reporters can create bugs without assigning immediately
  await queryInterface.changeColumn('Bugs', 'assignedUserId', {
    type: Sequelize.INTEGER,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  // Revert to NOT NULL constraint. NOTE: this will fail if NULL values exist.
  await queryInterface.changeColumn('Bugs', 'assignedUserId', {
    type: Sequelize.INTEGER,
    allowNull: false,
  });
}
