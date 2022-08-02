"use strict";

const images = [
  {
    userId: 3,
    spotId: 4,
    reviewId: 1,
    previewImage: true,
    url: "disneylandimg",
  },
  {
    userId: 1,
    spotId: 2,
    reviewId: 2,
    previewImage: true,
    url: "lambofieldimg",
  },
  {
    userId: 7,
    spotId: 1,
    reviewId: 3,
    previewImage: true,
    url: "theapartmentimg",
  },
  {
    userId: 4,
    spotId: 5,
    reviewId: 4,
    previewImage: true,
    url: "comiccondoimg",
  },
  {
    userId: 2,
    spotId: 3,
    reviewId: 5,
    previewImage: true,
    url: "ratchetimg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Images", images);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", images);
  },
};
