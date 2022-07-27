// backend/routes/index.js
const express = require('express');
const router = express.Router();

//TEST ROUTER
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

//Have to export the router for use
module.exports = router;
