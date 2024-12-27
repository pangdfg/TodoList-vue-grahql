

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
    toggleTodo(id: ID!, checked!): Todo!
    editTodo(id: ID!, title: String!, checked!): Todo!
  }
`;

module.exports = todoSchema;
