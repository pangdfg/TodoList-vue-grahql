const axios = require('axios');

const todoResolver = {
  Query: {
    todos: async (_, { userId }) => {
      const response = await axios.get(`http://todo-service:3001/todos?userId=${userId}`);
      return response.data;
    },
  },
  Mutation: {
    createTodo: async (_, { title, userId }) => {
      const response = await axios.post(`http://todo-service:3001/todos`, {
        title,
        userId,
      });
      return response.data;
    },
    toggleTodo: async (_, { id }) => {
      const response = await axios.patch(`http://todo-service:3001/todos/${id}/toggle`);
      return response.data;
    },
  },
};

module.exports = todoResolver;
