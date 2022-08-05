const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

//Validators Here:
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
  ];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required.'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End date is required.'),
    handleValidationErrors
];

//Get Spot of Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const currentId = req.user.id
    const spotsOfCurrentUser = await Spot.findAll({
        where: {
            ownerId: currentId
        }
    })
    res.json(spotsOfCurrentUser);
});

//Get Details of Spot by ID
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    const spotDetailsId = await Spot.findByPk(spotId);

    if (!spotDetailsId) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error);
    } else {
        return res.json(spotDetailsId);
    };
});

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll();
    res.json({
        "Spots": allSpots
    });
});

//Post an Image to a Spot based on the Spot's ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body;
    const { spotId } = req.params;

    const spotById = await Spot.findByPk(spotId);

    if(!spotById) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        error.errors = [`Spot with ID: ${spotId} does not exist`];
        return next(error);
    };
    const newImage = await Image.create({
        url: url,
        spotId: spotId,
        userId: req.user.id
    });
    return res.json({
        "id": newImage.id,
        "imageableId": newImage.spotId,
        "url": newImage.url
    });
});

//Create a Spot
router.post('/', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

    return res.json(newSpot)
});

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;

    const spotById = await Spot.findByPk(spotId);
    //{ where: { ownerId: req.user.id }}
    if (!spotById) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error);
    } else if (spotById.ownerId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    } else {
        spotById.address = address;
        spotById.city = city;
        spotById.state = state;
        spotById.country = country;
        spotById.lat = lat;
        spotById.lng = lng;
        spotById.name = name;
        spotById.description = description;
        spotById.price = price;

        await spotById.save();
        return res.json(spotById);
    };
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;

    const spotToDelete = await Spot.findByPk(spotId);

    if (!spotToDelete) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    } else if (spotToDelete.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await spotToDelete.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    };
});

//Get all Reviews by a Spot's Id - Reviews feature
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;
    const spotById = await Spot.findByPk(spotId);

    if (!spotById) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error);
    } else {
        const reviews = await Review.findAll({
            where: {
                spotId
            }
        });
        //console.log("Im here", reviews)
        for (let review of reviews) {
            const user = await review.getUser({
              attributes: ['id', 'firstName', 'lastName']
            });
            const image = await review.getImages({
              attributes: ['id', ['reviewId', 'imageableId'], 'url']
            });
            review.dataValues.User = user.toJSON();
            review.dataValues.Image = image
          }
        return res.json({
            "Reviews": reviews
        });
    }
});

//Create a Review for a Spot based on the Spot's ID - Reviews feature
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spotById = await Spot.findByPk(spotId);
    if (!spotById) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error);
    };

    const reviews = await Review.findAll({
        where: {
            [Op.and]: [
                { userId: req.user.id },
                { spotId: spotId }
              ]
        }
    });
    if (reviews.length === 1) {
        const error = new Error("User already has a review for this spot")
        error.status = 403
        return next(error)
    };

    const newReview = await Review.create({
        review: review,
        stars: stars,
        userId: req.user.id,
        spotId: spotId
    });

    res.status(201)
    return res.json(newReview);
});

//Get All Bookings for a spot based on the Spot's Id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const spotById = await Spot.findByPk(spotId);

    if (!spotById) {
        const error = new Error('Spot couldnt be found');
        error.status = 404;
        return next(error);
    }
    //Owner response here
    if (spotById.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
            where : {
                spotId: spotId
            },
            include: {
                model: User
            }
        });
        return res.json({
            "Bookings": bookings
        })
    //Not Owner response here
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        });
        return res.json({
            "Bookings": bookings
        })
    }
});

//Create a Booking from a Spot based on the Spot's Id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const { spotId } = req.params;
    let { startDate, endDate } = req.body;
    //dates come in as strings have to convert into date objects
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    //Check the spot to book
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        const error = new Error('Spot couldnt be found');
        error.status = 404;
        return next(error);
    };
    //Check if current user owns the spot
    if (spot.ownerId === req.user.id) {
        const error = new Error('Cannot create booking, spot cannot belong to current user!');
        error.status = 403;
        return next(error);
    };
    //Check start and end date for valid booking time slot
    if (startDate >= endDate) {
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
        })
    }
    //Check if there are any current bookings for spot if found
    const bookings = await Booking.findAll({
        where: {
            spotId: spot.id,
            [Op.and]: [
                { startDate: {[Op.lte]: endDate} },
                { endDate: {[Op.gte]: startDate} }
            ]
        }
    });
    //error object to be returned in the res.json
    let errors = {
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
    };
    for (let booking of bookings) {
        if (startDate >= booking.startDate && startDate <= booking.endDate) {
            errors.startDate = "Start date conflicts with an existing booking"
        }
        if (endDate <= booking.endDate && endDate >= booking.startDate) {
            errors.endDate = "End date conflicts with an existing booking"
        }
        if (errors.startDate || errors.endDate) {
            res.status(403);
            return res.json(errors);
        }
    };
    //else create a booking if no length (no current booking)
    const newBooking = await Booking.create({
        spotId: spotId,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    });
    return res.json(newBooking);
});


module.exports = router;
