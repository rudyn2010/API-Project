'use strict';

const sampleBookings = [
  {
    spotId: 4,
    userId: 2,
    startDate: '2022-12-23',
    endDate: '2022-12-30'
  },
  {
    spotId: 3,
    userId: 1,
    startDate: '2022-10-20',
    endDate: '2022-10-25'
  },
  {
    spotId: 1,
    userId: 3,
    startDate: '2022-08-01',
    endDate: '2022-08-03'
  },
  {
    spotId: 2,
    userId: 5,
    startDate: '2022-08-12',
    endDate: '2022-08-15'
  },
  {
    spotId: 5,
    userId: 4,
    startDate: '2022-09-11',
    endDate: '2022-09-25'
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  await queryInterface.bulkInsert('Bookings', sampleBookings)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  await queryInterface.bulkDelete('Bookings', sampleBookings, null, {})
  }
};
