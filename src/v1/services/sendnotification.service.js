const admin = require('firebase-admin');
var serviceAccount = require('../firebase/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class SendNotifiCation {
  like() {
    // Khởi tạo ứng dụng Firebase Admin

    const message = {
      notification: {
        title: 'Thông báo',
        body: 'Bài viết của bạn đã nhận được một sự kiện mới.',
      },
      token: 'MÃ_TOKEN_THIẾT_BỊ',
    };

    // Gửi thông báo tới thiết bị
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log(`Thông báo đã được gửi:, ${response})`);
      })
      .catch((error) => {
        console.log(`Lỗi khi gửi thông báo:', ${error}`);
      });
  }
}
module.exports = new SendNotifiCation();
