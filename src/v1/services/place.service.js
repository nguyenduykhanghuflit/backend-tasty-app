class PlaceService {
  getAllPlace() {
    return new Promise((resolve, reject) => {
      try {
        resolve({ data: 'ok place service' });
      } catch (error) {
        reject(error);
      }
    });
  }
}
module.exports = new PlaceService();
