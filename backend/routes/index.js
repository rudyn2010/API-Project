// backend/routes/index.js
const express = require('express');
const router = express.Router();

//TEST ROUTER
/* from earlier "Hello World" -- removed */

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

// backend/routes/index.js
// ... Import this file from api/index into the routes/index.js
// file and connect it to the router there.
const apiRouter = require('./api');

router.use('/api', apiRouter);
// ...


//Have to export the router for use
module.exports = router;
