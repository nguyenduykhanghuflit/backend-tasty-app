const express = require('express');
const app = express();

//init db
const connectDatabase = require('./v1/databases/config/connectDatabase');
connectDatabase();

const helmet = require('helmet');
app.use(helmet());

const morgan = require('morgan');
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms  :date[clf]'
  )
);

const cors = require('cors');
app.use(cors({ credentials: true, origin: true }));

// compress responses
const compression = require('compression');
app.use(compression());

// add body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const path = require('path');
app.use('/static/', express.static(path.join(__dirname, './v1/public/')));

//router
const initRouter = require('./v1/routes/index.router');
app.use('/', (req, res) => res.send('oke server'));
app.use('/api', initRouter);

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
