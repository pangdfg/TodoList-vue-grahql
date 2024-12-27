const axios = require('axios');

const TODO_API_URL = 'http://todo-service:8080';

const todoResolver = {
  Query: {
    todos: async (_, __, { userAuth }) => {
      try {
        const response = await axios.get(`${TODO_API_URL}/todos`, {
          headers: { Authorization: `Bearer ${userAuth}` },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching todos:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
  },
  Mutation: {
    createTodo: async (_, { title }, { userAuth }) => {
      try {
        const response = await axios.post(
          `${TODO_API_URL}/todos`,
          { title },
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return response.data;
      } catch (error) {
        console.error("Error creating todo:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    toggleTodo: async (_, { id }, { userAuth }) => {
      try {
        const response = await axios.patch(
          `${TODO_API_URL}/todos/${id}/toggle`,
          {},
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return response.data;
      } catch (error) {
        console.error("Error toggling todo:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
  },
};

module.exports = todoResolver;
