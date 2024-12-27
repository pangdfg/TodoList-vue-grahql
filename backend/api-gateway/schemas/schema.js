const { makeExecutableSchema } = require('@graphql-tools/schema');
const  userSchema  = require('./userSchema');
const  todoSchema = require('./todoSchema');  
const  userResolver  = require('../resolvers/userResolver');
const  todoResolver  = require('../resolvers/todoResolver');

const schema = makeExecutableSchema({
    typeDefs: [ userSchema, todoSchema],
    resolvers: [userResolver, todoResolver],
});

module.exports = schema;
