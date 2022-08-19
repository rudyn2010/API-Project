// backend/routes/api/session.js - Phase 4
const express = require('express')

//Phase 4 - User Login API ROUTE
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

//Phase 5 -Import check functions we created
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//??? where did this come from
const { use } = require('./users');

//Phase 5 - middleware to check these keys and validate them
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const router = express.Router();

// Phase 4 - Log in
router.post('/', validateLogin, async (req, res, next) => {
  //have to destructure the same stuff from body here and in front end
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    const token = await setTokenCookie(res, user);
    const validUser = user.toSafeObject();
    validUser.token = token;
    return res.json({
        validUser
    });
});

//Phase 4: User Logout API Route
// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

// Phase 4 - Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
});

module.exports = router;
