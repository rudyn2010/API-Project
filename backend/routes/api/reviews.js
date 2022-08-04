const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const { id } = req.user;
    const reviews = await Review.findAll({
        where: {
            userId: id
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
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);
    if (!review) {
        const error = new Error("Review couldnt be found");
        error.status = 404;
        return next(error);
    };
    const imagesOfReview = await Image.findAll({
        where: {
            spotId: review.spotId
        }
    });
    if (imagesOfReview.length >= 10) {
        const error = new Error("Maximum number of images for this resource was reached");
        error.status = 403;
        return next(error);
    } else {
        const newImg = await Image.create({
            url: url,
            userId: req.user.id,
            spotId: review.spotId,
            reviewId: reviewId
        });
        return res.json({
            "id": newImg.id,
            "imageableId": newImg.spotId,
            "url": newImg.url
        });
    };
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
