const express = require('express');
const router = express.Router();

const placeRouter = require('./place.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const uploadRouter = require('./upload.router');

router.use(placeRouter);
router.use(userRouter);
router.use(authRouter);
router.use(uploadRouter);

module.exports = router;
