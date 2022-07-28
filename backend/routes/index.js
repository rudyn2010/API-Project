// backend/routes/index.js
const express = require('express');
const router = express.Router();

// ... Import this file from api/index into the routes/index.js
// file and connect it to the router there.
const apiRouter = require('./api');
router.use('/api', apiRouter);

// backend/routes/index.js
// ... CSRF Token access for development
// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
// ...



//Have to export the router for use
module.exports = router;
