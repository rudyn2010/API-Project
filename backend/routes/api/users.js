// backend/routes/api/users.js - Phase 4
const express = require('express')

//Phase 4 - User Signup requires
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

//Phase 5 - Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Phase 5 - middleware that will check these keys and validate them for post signup route from body of req (username, email, password)
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user
    });
});

module.exports = router;
