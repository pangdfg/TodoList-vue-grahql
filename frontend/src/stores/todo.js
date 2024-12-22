import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['All', 'Pending', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        this.list = [
          { id: 1, name: 'Todo 1', isDone: false },
          { id: 2, name: 'Todo 2', isDone: true },
        ];
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
      const newTodo = {
        id: Date.now(),
        name: todoText.trim(),
        status: 'Pending',
        isDone: false
      };
      try {
        this.list.push(newTodo);
        return true;
      } catch (error) {
        console.log('Error adding todo:', error);
        return false;
      }
    },
    async editTodo(todoData, id) {
      try {
        const index = this.list.findIndex(todo => todo.id === id);
        if (index === -1) {
          console.error(`Todo with ID ${id} not found`);
          return false;
        }
        this.list[index] = { ...this.list[index], ...todoData };
        return true;
      } catch (error) {
        console.log('Error editing todo:', error);
        return false;
      }
    },
    async removeTodo(id) {
      try {
        this.list = this.list.filter(todo => todo.id !== id);
        return true;
      } catch (error) {
        console.log('Error removing todo:', error);
        return false;
      }
    }
  }
});
