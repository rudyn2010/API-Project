const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

//Validators Here
const validateBooking = [

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


module.exports = router;
