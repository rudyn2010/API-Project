const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const router = express.Router();

//Delete an Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const image = await Image.findByPk(imageId);

    if (!image) {
        const error = new Error("Image couldn't be found");
        error.status = 404;
        return next(error);
    }
    if (image.userId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error);
    } else {
        await image.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
});

module.exports = router;
