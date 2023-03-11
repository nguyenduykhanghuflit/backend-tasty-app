const app = require('express');
const multer = require('multer');
const router = app.Router();
const db = require('../databases/models');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/v1/public/'); // thư mục lưu trữ tệp được tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // tên tệp sẽ được lưu trữ trên máy chủ
  },
});

const upload = multer({ storage: storage }).array('image', 20);

const abc = async (req, res, next) => {
  const type = req.query;
  if (!type) return res.status(400).json('Missing type');
  return next();
};

router.post('/upload', (req, res) => {
  const type = req.query.type;
  if (!type) return res.status(400).json('Missing type');

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // lỗi khi tải lên tệp
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    // tạo một mảng các đối tượng File dựa trên các tệp đã tải lên
    const files = req.files.map((file) => {
      return {
        url: file.path,
        type: 'avt',
        typeId: 3,
      };
    });
    // res.status(200).json(files);
    // // lưu thông tin về các tệp vào cơ sở dữ liệu
    await db.Media.bulkCreate(files).then(() => res.status(200).json(files));
  });
});

//todo later
router.get('/get-all-media', async (req, res) => {
  const dt = await db.Media.findAll();
  return res.send(dt);
});
module.exports = router;
