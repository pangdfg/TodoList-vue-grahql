const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const PORT = 4000;

const userSchema = require('./schemas/userSchema');
const todoSchema = require('./schemas/todoSchema');
const userResolver = require('./resolvers/userResolver');
const todoResolver = require('./resolvers/todoResolver');
const { verifyJWT } = require('./utils/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const schema = makeExecutableSchema({
  typeDefs: [userSchema, todoSchema],
  resolvers: [userResolver, todoResolver],
});

app.use('/graphql', (req, res, next) => {
  const { operationName } = req.body;
  if (operationName === 'login' || operationName === 'register') {
    return next();
  }
  verifyJWT(req, res, next);
});

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { user: req.user },
  }))
);

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}/graphql`);
  });