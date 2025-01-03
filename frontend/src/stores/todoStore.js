import { defineStore } from 'pinia';
import api from '@/api/index.js';
import { createTodo, editTodo, deleteTodo } from '@/api/index.js';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['All', 'Pending', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            query: `
              query {
                todos {
                  id
                  title
                  checked
                  userId
                }
              }
            `
          })
        });
        const data = await response.json();
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }
        this.list = data.data.todos;
      } catch (error) {
        console.log('Error loading todos:', error);
      }
    },
    async loadTodo(id) {
      try {
        const todoData = this.list.find(todo => todo.id === id);
        if (!todoData) {
          console.error(`Todo with ID ${id} not found`);
          return null;
        }
        this.selectedTodo = todoData;
      } catch (error) {
        console.log('Error loading todo:', error);
        return null;
      }
    },
    async addTodo(todoText) {
      if (!todoText.trim()) {
        console.error('Todo text cannot be empty');
        return false;
      }
      try {
        const newTodo = await createTodo(todoText.trim());
        this.list.push(newTodo);
        return true;
      } catch (error) {
        console.log('Error adding todo:', error);
        return false;
      }
    },
    async editTodo(todoData, id) {
      try {
        const updatedTodo = await editTodo(id, todoData.title, todoData.checked);
        const index = this.list.findIndex(todo => todo.id === id);
        if (index === -1) {
          console.error(`Todo with ID ${id} not found`);
          return false;
        }
        this.list[index] = updatedTodo;
        return true;
      } catch (error) {
        console.log('Error editing todo:', error);
        return false;
      }
    },
    async removeTodo(id) {
      try {
        await deleteTodo(id);
        this.list = this.list.filter(todo => todo.id !== id);
        return true;
      } catch (error) {
        console.log('Error removing todo:', error);
        return false;
      }
    }
  }
});