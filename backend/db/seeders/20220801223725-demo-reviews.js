'use strict';

const sampleReviews = [
  {
    review: 'It truly was the happiest place on earth',
    stars: 4,
    userId: 3,
    spotId: 4
  },
  {
    review: 'Sleeping under the Bean was very cold',
    stars: 5,
    userId: 1,
    spotId: 6
  },
  {
    review: 'It was lit',
    stars: 5,
    userId: 7,
    spotId: 1
  },
  {
    review: 'It felt like I was back at home',
    stars: 4,
    userId: 4,
    spotId: 5
  },
  {
    review: 'This was the dirtiest place I have ever set foot in',
    stars: 1,
    userId: 2,
    spotId: 3
  },
  {
    review: 'This couple had a very nice apartment, and their cat was so cute! What a lovely spot!',
    stars: 5,
    userId: 1,
    spotId: 1
  },
  {
    review: "Very spacious spot in San Diego! Views were amazing, pool was great! A nice place to lounge and vacation at.",
    stars: 4,
    userId: 1,
    spotId: 5
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', sampleReviews)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', sampleReviews, null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
