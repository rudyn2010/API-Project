const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

//Validators Here
const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('End date is required'),
    handleValidationErrors
];

//Get All of the Current User's Bookings
router.get('/current', requireAuth, restoreUser, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        }
    });
    const image = await Image.findOne({
        where: {
            userId: req.user.id
        }
    });
    let resultsArr = [];
    for (let booking of bookings) {
        let bookingJson = booking.toJSON();
        bookJson.Spot.previewImage = image.dataValues.url;
        resultsArr.push(bookJson);
    }
    return res.json({
        "Bookings": resultsArr
    })
});

//Edit a Booking
router.put('/:bookingId', requireAuth, restoreUser, validateBooking, async (req, res, next) => {
    const { bookingId } = req.params;
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const todaysDate = new Date();

    let bookingById = await Booking.findByPk(bookingId);
    if (!bookingById) {
        const error = new Error("Booking couldnt be found");
        error.status = 404;
        return next(error);
    }
    if (bookingById.ownerId !== req.user.id) {
        const error = new Error("Forbidden. Booking must belong to current user.")
        error.status = 403;
        return next(error);
    }
    if (bookingById.endDate < todaysDate) {
        const error = new Error("Past bookings cant be modified");
        error.status = 403;
        return next(error);
    }
    if (startDate >= endDate) {
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }
    const bookings = await Booking.findAll({
        where: {
            spotId: bookingById.spotId,
            [Op.and]: [
                {startDate: {[Op.lte]: endDate}},
                {endDate: {[Op.gte]: startDate}}
            ]
        }
    })
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
    }
    if (errors.startDate || errors.endDate) {
        res.status(403);
        return res.json(errors)
    } else {
        bookingById.startDate = startDate;
        bookingById.endDate = endDate;

        await bookingById.save();
        return res.json(booking);
    }
});

//Delete a booking
router.delete('/:bookingId', requireAuth, restoreUser, async (req, res, next) => {
    const { bookingId } = req.params;
    const todaysDate = new Date();
    //Find booking
    const booking = await Booking.findByPk(bookingId);

    //Find spot to get ownerId to delete bookings for their spot
    const spot = await Spot.findByPk(booking.spotId);

    if (!booking) {
        const error = new Error("Booking couldn't be found");
        error.status = 404;
        return next(error);
    };
    if (booking.startDate < todaysDate || todaysDate < booking.endDate) {
        const error = new Error("Bookings that have been started can't be deleted");
        error.status = 403;
        return next(error);
    }
    if (booking.userId === req.user.id || spot.ownerId === req.user.id) {
        await booking.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    // const error = new Error("Forbidden.")
    // error.status = 403;
});

module.exports = router;
