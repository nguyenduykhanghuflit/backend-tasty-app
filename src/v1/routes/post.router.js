const app = require('express');
const router = app.Router();
const PostController = require('../controller/post.controller');
const AuthMiddleware = require('../middleware/auth');
const { uploadImages } = require('../middleware/upload');
router.post(
  '/post',
  AuthMiddleware.Logged,
  uploadImages,
  PostController.createPost
);
router.get('/post', PostController.getPost);

module.exports = router;
