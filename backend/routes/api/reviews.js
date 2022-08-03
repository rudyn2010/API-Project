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
    const user = User.findAll({
        where: {
            id: reviews.userId
        }
    });
    const userTest = User.findByPk(currentUserId);
    const spots = Spot.findAll({
        where: {
            id: reviews.spotId
        }
    })
    const images = Image.findAll({
        where: {
            reviewId: mhj
        }
    })

    res.json({
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
