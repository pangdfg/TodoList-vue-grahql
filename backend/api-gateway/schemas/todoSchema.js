

const todoSchema = `
  type Todo {
    id: ID!
    title: String!
    checked: Boolean!
    userId: ID!
  }

  type Query {
    todo: [Todo!]
  }

  type Mutation {
    createTodo(title: String!): Todo!
    toggleTodo(id: ID!): Todo!
  }
`;

module.exports = todoSchema;
