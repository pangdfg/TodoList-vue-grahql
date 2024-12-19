import { defineStore } from 'pinia'


export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['All','Pending', 'Done']
  }),
  actions: {
    async loadTodos () {
      try {
        // Using fake data instead of real API call
        this.list = [
          { id: 1, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 10, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 11, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 12, name: 'Todoqweasd', status: 'Pending', isDone: false },
          { id: 13, name: 'Todo 1qwdasdqwr', status: 'Pending', isDone: false },
          { id: 14, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 15, name: 'Todoasdasdasdasdasdasdasdasdasdasdasdasdasdadasd', status: 'Pending', isDone: false },
          { id: 16, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 17, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 18, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 19, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 110, name: 'Todo 1', status: 'Pending', isDone: false },
          { id: 3, name: 'Todo 3', status: 'Done', isDone: true }
        ];
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadTodo (id) {
      try {
        const todoData = this.todoStore.list.find(todo => todo.id === id);
        if (todoData) {
          this.selectedTodo = todoData;
        } else {
          console.error(`Todo with ID ${id} not found`);
        }
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
