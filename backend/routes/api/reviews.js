const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { currentUserId } = req.user;
    const reviews = Review.findAll({
        where: {
            userId: currentUserId
        }
    });
    for (let review of reviews) {
        const ownerOfReview = await review.getUser({
            attributes: ['id', 'firstName', 'lastName']
        });
        const spotOfReview = await review.getSpot();
        const imagesOfReview = await review.getImages({
            attributes: ['id', ['reviewId', 'imageableId'], 'url']
        });
        review.dataValues.User = ownerOfReview.toJSON();
        review.dataValues.Spot = spotOfReview.toJSON();
        review.dataValues.Images = imagesOfReview;
    };

    return res.json({
        "Reviews": reviews
    });
});

//Add an Image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    res.json();
});

//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {

    res.json();
});

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    res.json();
});

module.exports = router;
