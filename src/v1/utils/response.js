module.exports = {
  // cần check lại data type
  success: (res, statusCode, data) => {
    return res.status(statusCode).json(data);
  },
  throwError: (ex = null, status = null, next) => {
    if (ex) {
      const err = new Error(ex);
      err.status = status || 500;
      return next(err);
    }
    return next();
  },
};
