'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      // if you want an auto-incrementing PK:
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      //   allowNull: false
      // },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',   // name of your users table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Listings', // or 'Products', whatever your table is called
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Composite PK (optional)
    await queryInterface.addConstraint('Carts', {
      fields: ['userId','productId'],
      type: 'primary key',
      name: 'Carts_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};
