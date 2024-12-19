import { defineStore } from 'pinia'


export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos () {
      try {
        // Using fake data instead of real API call
        this.list = [
          { id: 1, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 2, name: 'Todo 2', status: 'Doing', isDone: false },
          { id: 3, name: 'Todo 3', status: 'Done', isDone: true }
        ];
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadTodo (id) {
      try {
        // Using fake data instead of real API call
        this.selectedTodo = { id: id, name: `Todo ${id}`, status: 'Pending', isDone: false };
      } catch (error) {
        console.log('error', error)
      }
    },
    async addTodo (todoText) {
      const newTodo = {
        id: Date.now(), // Generate a unique ID
        name: todoText,
        status: 'Pending',
        isDone: false
      }
      try {
        // Using fake data, directly push newTodo to list
        this.list.push(newTodo);
      } catch (error) {
        console.log('error', error)
      }
    },
    async editTodo (todoData, id) {
      try {
        // Find and update the todo with the given ID
        const index = this.list.findIndex(todo => todo.id === id);
        if (index !== -1) {
          this.list[index] = { ...this.list[index], ...todoData };
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    async removeTodo (id) {
      try {
        // Remove the todo with the given ID
        this.list = this.list.filter(todo => todo.id !== id);
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
