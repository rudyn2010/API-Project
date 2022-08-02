// backend/routes/api/users.js - Phase 4
const express = require('express')

//Phase 4 - User Signup requires
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
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
//Extra Password checks
    check('password')
      .exists({checkFalsy:true})
      .notEmpty()
      .withMessage('Password is required.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
//Validate Sign-Up with firstName and lastName
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required.'),
    handleValidationErrors
  ];

// Sign Up a User Route
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    const emailValidation = await User.findOne({
      where: { email }
    });
    if (emailValidation) {
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    };

    const usernameValidation = await User.findOne({
      where: { username }
    });
    if (usernameValidation) {
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    };

    //Sign Up a new user if passing email / username validation (not in db)
    const newUser = await User.signup({ firstName, lastName, email, username, password });
    const token = await setTokenCookie(res, user);

    newUser = newUser.toJSON()
    newUser.token = token

    return res.json({
        newUser
    });
});

module.exports = router;
