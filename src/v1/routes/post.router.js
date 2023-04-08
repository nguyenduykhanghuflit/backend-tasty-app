const app = require('express');
const router = app.Router();
const PostController = require('../controller/post.controller');
const AuthMiddleware = require('../middleware/auth');
const uploadImages = require('../middleware/uploadImage');
const { uploadCloundinary } = require('../middleware/uploadCloundinary');
router.post(
  '/post',
  AuthMiddleware.Logged,
  uploadCloundinary,
  PostController.createPost
);
router.get('/post', PostController.getPost);

module.exports = router;
