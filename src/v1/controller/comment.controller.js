const commentService = require('../services/comment.service');
const { success, throwError } = require('../utils/response');
const sendNotifiCation = require('../services/sendnotification.service');
class CommentController {
  async getComment(req, res, next) {
    try {
      const { postId } = req.query;
      if (!postId) return throwError('Missing postId', 400, next);
      const data = await commentService.getComment(postId);
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at get comment controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  async createComment(req, res, next) {
    try {
      const userId = req.userId;
      if (!userId) return throwError('Unauthorized', 401, next);

      const info = { ...req.body, userId };
      const requiredFields = ['userId', 'postId', 'content'];
      const missingFields = requiredFields.filter((field) => !info[field]);
      if (missingFields.length > 0) {
        return throwError(
          `Missing data: ${missingFields.toString()}`,
          400,
          next
        );
      }
      const response = await commentService.createComment(info);
      return success(res, 200, response);
    } catch (error) {
      const msg = 'Failed at create comment controller: ' + error;
      return throwError(msg, 500, next);
    }
  }

  async userLikePost(req, res, next) {
    try {
      sendNotifiCation.like();
      console.log('::oke');
      res.send('đã send');
    } catch (error) {
      console.log('::error');
      res.send('send lỗi');
    }
  }
}
module.exports = new CommentController();
