require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRouter = require('./routers/users');
const movieRouter = require('./routers/movies');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userRouter);
app.use('/movies', movieRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err instanceof Error) {
    return res.status(400).send({ error: err.message });
  }

  return res.status(500).send({ error: 'Internal Server Error' });
});

app.listen(PORT);
