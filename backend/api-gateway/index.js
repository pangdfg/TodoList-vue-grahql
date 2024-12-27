const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const PORT = 4000;

const { verifyJWT } = require('./utils/jwtVerify');
const Schema = require('./schemas/schema');
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
  graphqlHTTP((req) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    return {
      schema: Schema, 
      graphiql: true,
      context: { 
        userAuth: token,
      },
    };
  })
);

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}/graphql`);
});

