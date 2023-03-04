const express = require('express');
const router = express.Router();

const placeRouter = require('./place.router');

router.use(placeRouter);

module.exports = router;
