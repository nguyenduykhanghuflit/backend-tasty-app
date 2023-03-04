const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');

const databaseLoad = require('./v1/databases/init.mysql');

//init dbs
databaseLoad();

//user middleware
app.use(helmet());
app.use(morgan('combined'));

// compress responses
app.use(compression());

// add body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms  :date[clf]'
  )
);
app.use(cors({ credentials: true, origin: true }));
// app.use(cookieParser(process.env.signed_cookie));
//app.use('/static/', express.static(path.join(__dirname, '../api/public')));

//router
app.use(require('./v1/routes/index.router'));

// Error Handling Middleware

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
