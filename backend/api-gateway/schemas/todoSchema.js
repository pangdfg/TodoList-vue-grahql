
const todoSchema = `
  type Todo {
    id: ID!
    title: String!
    checked: Boolean!
    userId: ID!
  }

  type Query {
    todos(userId: ID!): [Todo!]
  }

  type Mutation {
    createTodo(title: String!, userId: ID!): Todo!
    toggleTodo(id: ID!): Todo!
  }
`;

module.exports = todoSchema;
