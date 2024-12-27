

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
    toggleTodo(id: ID!, checked: Boolean!): Todo!
    editTodo(id: ID!, title: String!, checked: Boolean!): Todo!
  }
`;

module.exports = todoSchema;
