const MEDIA_TYPE = {
  avatar: 'avatar',
  place: 'place',
  post: 'post',
};

const CATALOG = {
  morning: 'Ăn sáng',
  afternoon: 'Ăn trưa',
  cafe: 'Cà phê',
  snack: 'Ăn vặt',
  evening: 'Ăn tối',
};

const PLACE_TYPE = [
  'morning',
  'afternoon',
  'evening',
  'snack',
  'cafe',
  'buffet',
  'thailand',
  'korea',
  'jp',
  'vn',
  'rice',
  'pot',
  'fastfood',
];
module.exports = {
  MEDIA_TYPE,
  CATALOG,
  PLACE_TYPE,
  isSubarray: (subArray, mainArray) => {
    for (let i = 0; i < subArray.length; i++) {
      if (!mainArray.includes(subArray[i])) {
        return false;
      }
    }

    return true;
  },
};
