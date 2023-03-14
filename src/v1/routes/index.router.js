const express = require('express');
const router = express.Router();

const placeRouter = require('./place.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const uploadRouter = require('./upload.router');
const postRouter = require('./post.router');
const commentRouter = require('./comment.router');

router.use(placeRouter);
router.use(userRouter);
router.use(authRouter);
router.use(uploadRouter);
router.use(postRouter);
router.use(commentRouter);

module.exports = router;
