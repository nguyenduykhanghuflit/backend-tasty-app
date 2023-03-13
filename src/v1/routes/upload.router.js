const app = require('express');
const multer = require('multer');
const router = app.Router();
const db = require('../databases/models');
const { success, throwError } = require('../utils/response');
const { upload } = require('../utils/upload');

const TYPE = {
  avatar: 'avatar',
  place: 'place',
  post: 'post',
};
router.post('/upload', (req, res, next) => {
  const { type, typeId } = req.query;
  if (!type || !TYPE[type] || !typeId)
    return throwError('Missing type', 400, next);

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // lỗi khi tải lên tệp
      return throwError('Upload fail', 500, next);
    } else if (err) {
      //loi khac
      return throwError('Upload fail', 500, next);
    } else {
      const files = req.files.map((file) => {
        return {
          url: `/static/${file.filename}`,
          type: TYPE[type],
          typeId,
        };
      });

      //lưu thông tin về các tệp vào cơ sở dữ liệu

      await db.Media.bulkCreate(files)
        .then(() => success(res, 200, files))
        .catch((err) => throwError(`Update database fail: ${err}`, 500, next));
    }
  });
});

//todo later
router.get('/get-all-media', async (req, res) => {
  const dt = await db.Media.findAll();
  return res.send(dt);
});
module.exports = router;
