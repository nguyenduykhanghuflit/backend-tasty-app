const app = require('express');
const router = app.Router();
const PostController = require('../controller/post.controller');
const AuthMiddleware = require('../middleware/auth');

router.post('/post', AuthMiddleware.Logged, PostController.createPost);
router.get('/post', PostController.getPost);

module.exports = router;
