const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const PORT = 4000;

const Schema = require('./schemas/schema');
const { verifyJWT } = require('./utils/jwtVerify');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', (req, res, next) => {
  const { operationName } = req.body;
  if (operationName === 'login' || operationName === 'register' || req.originalUrl === '/graphql') {
    return next();
  }
  verifyJWT(req, res, next);
});

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    Schema,
    graphiql: true,
    context: { user: req.user },
  }))
);

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}/graphql`);
  });