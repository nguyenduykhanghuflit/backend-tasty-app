const userService = require('../services/user.service');
const { success, throwError } = require('../utils/response');
const { uploadImageToCloudinary } = require('../utils/upload');
const multer = require('multer');
// configure multer to specify the destination folder and filename
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// create the multer middleware to handle file upload
const upload = multer({ storage: storage }).single('avt');
class UserController {
  // get user for dev
  //*todo later
  async getAllUser(req, res, next) {
    try {
      const data = await userService.getAllUser();
      return success(res, 200, data);
    } catch (ex) {
      console.log('lỗi đây ' + ex);
      const msg = 'Failed at getAllUser controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  async getUserInfo(req, res, next) {
    try {
      const userId = req.userId;
      const data = await userService.getUserInfo(userId);
      return success(res, 200, data);
    } catch (ex) {
      const msg = 'Failed at getUserInfo controller: ' + ex;
      return throwError(msg, 500, next);
    }
  }

  async updateUserInfo(req, res, next) {
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
      }
      try {
        let url = null;
        if (req.file?.path) {
          const result = await uploadImageToCloudinary(req.file.path);
          url = result;
        }

        const userId = req.userId;
        const info = req.body;
        if (url) info.avatar = url;
        const data = await userService.userUpdate(info, userId);
        if (data.msg === 'Password Invalid') {
          return throwError(data.msg, 400, next);
        }
        return success(res, 200, data);
      } catch (ex) {
        const msg = 'Failed at getUserInfo controller: ' + ex;
        return throwError(msg, 500, next);
      }
    });
  }
}
module.exports = new UserController();
