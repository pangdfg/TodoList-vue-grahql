const axios = require('axios');

const TODO_API_URL = 'http://todo-service:8080';

const todoResolver = {
  Query: {
    todos: async (_, __, { userAuth }) => {
      try {
        const response = await axios.get(`${TODO_API_URL}/todos`, {
          headers: { Authorization: `Bearer ${userAuth}` },
        });
        return {
          status: response.status,
          todos: response.data.todos.map(todo => ({
            id: todo.id,
            title: todo.title,
            checked: todo.checked,
            userId: todo.userId,
          })),
        };
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
        return {
          status: response.status,
          id: response.data.id,
          title: response.data.title,
          checked: response.data.checked,
          userId: response.data.userId,
        };
      } catch (error) {
        console.error("Error creating todo:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    toggleTodo: async (_, { id , checked}, { userAuth }) => {
      try {
        const response = await axios.patch(
          `${TODO_API_URL}/todos/${id}/toggle`,
          { checked },
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return {
          status: response.status,
          id: response.data.id,
          title: response.data.title,
          checked: response.data.checked,
          userId: response.data.userId,
        };
      } catch (error) {
        console.error("Error toggling todo:", error.response ? error.response.data : error.message);
        return {
          status: error.response ? error.response.status : 500,
          message: error.response ? error.response.data : error.message,
        };
      }
    },
    editTodo: async (_, { id ,title ,checked}, { userAuth }) => {
      try {
        const response = await axios.patch(
          `${TODO_API_URL}/todos/${id}/edit`,
          {id, title, checked},
          { headers: { Authorization: `Bearer ${userAuth}` } }
        );
        return {
          status: response.status,
          id: response.data.id,
          title: response.data.title,
          checked: response.data.checked,
          userId: response.data.userId,
        };
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
