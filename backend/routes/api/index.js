/* All the API routes will be served at URL's starting with /api/. */

// backend/routes/api/index.js
const router = require('express').Router();

//TEST - API router
// backend/routes/api/index.js
// ...
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
// ...

module.exports = router;
