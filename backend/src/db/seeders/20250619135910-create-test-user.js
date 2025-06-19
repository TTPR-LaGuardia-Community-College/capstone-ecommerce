'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('password123', 10);
    return queryInterface.bulkInsert('Users', [{
      id:        '11111111-1111-1111-1111-111111111111',
      username:  'testuser',
      email:     'test@example.com',
      password:  hash,
      role:      'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', { email: 'test@example.com' });
  }
};
