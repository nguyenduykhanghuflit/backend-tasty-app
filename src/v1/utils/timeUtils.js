module.exports = {
  // cần check lại data type
  isValidTime: (value) => {
    const time = new Date(`01/01/1970 ${value}`);
    const miliseconds = time.getTime();
    return miliseconds >= 0 && miliseconds <= 86399999;
  },
  convertToMinutes: (time) => {
    const [hour, minute] = time.split(':');
    return parseInt(hour) * 60 + parseInt(minute);
  },
};
