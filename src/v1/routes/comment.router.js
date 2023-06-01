const app = require('express');
const router = app.Router();
const CommentController = require('../controller/comment.controller');
const AuthMiddleware = require('../middleware/auth');

router.get('/comment', CommentController.getComment);
router.post('/comment', AuthMiddleware.Logged, CommentController.createComment);

router.post('/noti', CommentController.userLikePost);
module.exports = router;
