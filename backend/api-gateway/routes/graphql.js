const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');

const schema = buildSchema(`
  type Query {
    user(id: ID!): User
    todos(userId: ID!): [Todo]
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
    createTodo(title: String!, userId: ID!): Todo
    toggleTodo(id: ID!): Todo
  }

  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Todo {
    id: ID!
    title: String!
    checked: Boolean!
    userId: ID!
  }
`);


const rootValue = {
  user: async ({ id }) => {
    const response = await axios.post('http://user-service:3000/graphql', {
      query: `{ user(id: "${id}") { id, username } }`,
    });
    return response.data.data.user;
  },
  todos: async ({ userId }) => {
    const response = await axios.post('http://todo-service:3001/graphql', {
      query: `{ todos(userId: "${userId}") { id, title, checked, userId } }`,
    });
    return response.data.data.todos;
  },
  register: async ({ username, password }) => {
    const response = await axios.post('http://user-service:3000/graphql', {
      query: `mutation { register(username: "${username}", password: "${password}") { id, username } }`,
    });
    return response.data.data.register;
  },
  login: async ({ username, password }) => {
    const response = await axios.post('http://user-service:3000/graphql', {
      query: `mutation { login(username: "${username}", password: "${password}") { token, user { id, username } } }`,
    });
    return response.data.data.login;
  },
  createTodo: async ({ title, userId }) => {
    const response = await axios.post('http://todo-service:3001/graphql', {
      query: `mutation { createTodo(title: "${title}", userId: "${userId}") { id, title, checked, userId } }`,
    });
    return response.data.data.createTodo;
  },
  toggleTodo: async ({ id }) => {
    const response = await axios.post('http://todo-service:3001/graphql', {
      query: `mutation { toggleTodo(id: "${id}") { id, title, checked, userId } }`,
    });
    return response.data.data.toggleTodo;
  },
};

module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true, 
});
