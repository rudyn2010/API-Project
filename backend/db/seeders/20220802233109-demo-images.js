"use strict";

const images = [
  {
    userId: 3,
    spotId: 4,
    reviewId: 1,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-696402115582168566/original/4d29a813-83d7-4334-b92e-241bb18df1d3.jpeg?im_w=960",
  },
  {
    userId: 1,
    spotId: 2,
    reviewId: 2,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/34822e87-1915-4f1e-9ae0-a5b0cccbce1e.jpg?im_w=960",
  },
  {
    userId: 7,
    spotId: 1,
    reviewId: 3,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-43244736/original/1e3ace03-5429-47ff-aaac-0ef71c9ad88f.jpeg?im_w=1200",
  },
  {
    userId: 4,
    spotId: 5,
    reviewId: 4,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/1ead06fe-0b05-463a-bb7c-55ef29fac1b5.jpg?im_w=960",
  },
  {
    userId: 2,
    spotId: 3,
    reviewId: 5,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-599112931775380314/original/5fa486d2-df0f-4b44-88ce-c3590e3be46d.jpeg?im_w=1200",
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
