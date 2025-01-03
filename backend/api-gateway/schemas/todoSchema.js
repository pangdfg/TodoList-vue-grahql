const todoSchema = `
  type Todo {
    id: ID!
    title: String!
    checked: Boolean!
    userId: ID!
  }

  type Query {
    todos: [Todo!]
    todoById(id: ID!): Todo!
  }

  type Mutation {
    createTodo(title: String!): Todo!
    editTodo(id: ID!, title: String!, checked: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

module.exports = todoSchema;
