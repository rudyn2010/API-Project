"use strict";

const images = [
  {
    userId: 3,
    spotId: 4,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-696402115582168566/original/4d29a813-83d7-4334-b92e-241bb18df1d3.jpeg?im_w=960",
  },
  {
    userId: 1,
    spotId: 2,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/34822e87-1915-4f1e-9ae0-a5b0cccbce1e.jpg?im_w=960",
  },
  {
    userId: 7,
    spotId: 1,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-43244736/original/1e3ace03-5429-47ff-aaac-0ef71c9ad88f.jpeg?im_w=1200",
  },
  {
    userId: 4,
    spotId: 5,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/1ead06fe-0b05-463a-bb7c-55ef29fac1b5.jpg?im_w=960",
  },
  {
    userId: 2,
    spotId: 3,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg?im_w=1200",
  },
  {
    userId: 1,
    spotId: 6,
    reviewId: null,
    previewImage: true,
    url: "https://cdn.vox-cdn.com/thumbor/saCTa5pnMNGETrEG2uhAf8ZHJdI=/0x0:7360x4912/920x613/filters:focal(3208x2597:4384x3773):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60127725/shutterstock_1109460509.0.jpg",
  },
  {
    userId: 1,
    spotId: 7,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/916094e7-677d-47ce-ad7e-5b6433206f57.jpg?im_w=1200",
  },
  {
    userId: 1,
    spotId: 8,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45465864/original/3d966c94-4c87-479b-8eeb-4889e9fb6ac9.jpeg?im_w=1440",
  },
  {
    userId: 1,
    spotId: 9,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-21397921/original/91411eed-7291-4419-8680-8c68b73ce726.jpeg?im_w=1200"
  },
  {
    userId: 4,
    spotId: 10,
    reviewId: null,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=1200"
  }
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
