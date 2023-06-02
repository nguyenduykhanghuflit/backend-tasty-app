module.exports = {
  // cần check lại data type
  isValidTime: (value) => {
    console.log(value);
    const time = new Date(`01/01/1970 ${'06:30'}`);
    const miliseconds = time.getTime();
    console.log(time);
    console.log(miliseconds >= 0 && miliseconds <= 86399999);
  },
  convertToMinutes: (time) => {
    const [hour, minute] = time.split(':');
    return parseInt(hour) * 60 + parseInt(minute);
  },
};
