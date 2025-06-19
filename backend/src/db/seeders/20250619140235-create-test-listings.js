'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Listings', [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        userId: '11111111-1111-1111-1111-111111111111',
        title: 'Calculus Textbook',
        description: 'A well-worn but fully eligible calculus text.',
        price: 30.00,
        category: 'Books',
        imageUrl: 'https://placeimg.com/200/200/tech',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        userId: '11111111-1111-1111-1111-111111111111',
        title: 'Used Laptop Charger',
        description: 'Compatible with MacBook Pro (2015–2019).',
        price: 20.00,
        category: 'Electronics',
        imageUrl: 'https://placeimg.com/200/200/tech',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        userId: '11111111-1111-1111-1111-111111111111',
        title: 'Desk Lamp',
        description: 'LED desk lamp with adjustable arm.',
        price: 15.50,
        category: 'Home',
        imageUrl: 'https://placeimg.com/200/200/arch',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Listings', {
      id: [
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'cccccccc-cccc-cccc-cccc-cccccccccccc'
      ]
    });
  }
};
