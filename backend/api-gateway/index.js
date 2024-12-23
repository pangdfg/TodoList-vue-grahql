const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 4000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', (req, res, next) => {
  const { operationName } = req.body;
  if (operationName === 'login' || operationName === 'register') {
    return next();
  }
  verifyJWT(req, res, next);
});

app.use('/graphql', graphqlRoute);

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}/graphql`);
  });