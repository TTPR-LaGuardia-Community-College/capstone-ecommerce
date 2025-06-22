"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );

    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
        primaryKey: true,
      },
      username:   { type: Sequelize.STRING, allowNull: false, unique: true },
      email:      { type: Sequelize.STRING, allowNull: false, unique: true },
      password:   { type: Sequelize.STRING, allowNull: false },
      role:       { type: Sequelize.ENUM("user","admin"), allowNull: false, defaultValue: "user" },
      createdAt:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updatedAt:  { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
    // drop the enum type too if you want:
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_role";'
    );
  },
};
