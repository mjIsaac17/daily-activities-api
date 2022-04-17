const express = require('express');
const moongose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const ApiError = require('./error/apiError');

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection
moongose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connection Successfull');
  })
  .catch((error) => console.log(error));

const specs = swaggerJsDoc(require('./swagger'));

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/activities', require('./routes/activity.routes'));

// 404 - Invalid route
app.use('/', (req, res, next) => {
  next(ApiError.notFound('Route not found'));
});

// Error handler
app.use((error, req, res, next) => {
  console.log(error);
  return res
    .status(error.status || 500)
    .json({ error: error.message || error });
});

// Run application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
