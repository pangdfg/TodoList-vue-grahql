<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '../components/Navbar.vue'

import { useTodoStore } from '../stores/todo'

import Loading from '../components/Loading.vue'


const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)

const selectedStatus = ref('Pending')

onMounted(async () => {
  isLoading.value = true
  await todoStore.loadTodos()
  isLoading.value = false
  // console.log(todoStore.list) มันเป็น proxy = เราก็แก้ผ่านตัวนี้ก็ได้
})

const todoFilteredList = computed(() => {
  if (selectedStatus.value === 'All') {
    return todoStore.list; 
  }
  return todoStore.list.filter(todo => todo.status === selectedStatus.value);
})

const changeSelectedStatus = (newStatus) => {
  selectedStatus.value = newStatus
}

const addTodo = async (todoText) => {
  isLoading.value = true
  try {
    await todoStore.addTodo(todoText)
    await todoStore.loadTodos()
  } catch (error) {
    console.log('error', error)
  }
  isLoading.value = false
}

const updateStatus = async (todoId, todoStatus) => {
  isLoading.value = true
  try {
    await todoStore.editTodo({
      status: todoStatus
    }, todoId)
  } catch (error) {
    console.log('error', error)
  }
  isLoading.value = false
}

const changeDoneStatus = async (event, todoId) => {
  isLoading.value = true
  try {
    if (event.target.checked) {
      await updateStatus(todoId, 'Done')
      await todoStore.loadTodos() 
    }
  } catch (error) {
    console.log('error', error)
  }
  isLoading.value = false
}

const removeTodo = async (id) => {
  isLoading.value = true
  try {
    await todoStore.removeTodo(id)
    await todoStore.loadTodos()
  } catch (error) {
    console.log('error', error)
  }
  isLoading.value = false
}

</script>

<template>

  <div>
    <header class=" justify-between">
      <Navbar />
    </header>
    <div class="max-w-4xl mx-auto p-4 mb-auto center">
    <div class="flex ">
      <input
        class="input input-bordered input-info w-full"
        type="text"
        placeholder="Add your item"
        v-model="todoText"
      >
      <button class="btn ml-4" @click="addTodo(todoText)">Add</button>
    </div>
    <div>
      <Loading v-if="isLoading"></Loading>
      <div>
        <div class="tabs tabs-boxed my-2">
          <a
            v-for="status in todoStore.statuses" :key="status"
            :class="status === selectedStatus ? 'tab tab-active' : 'tab'"
            @click="changeSelectedStatus(status)">
            {{ status }}
          </a>
        </div>
        <div class="flex items-center justify-between my-2" v-for="todo in todoFilteredList" :key="todo.id">
          <input type="checkbox" :checked="todo.isDone" class="checkbox" @change="changeDoneStatus($event, todo.id)" />
          <div :class="todo.isDone ? 'line-through' : ''">
            Item {{ todo.name }}
          </div>
          <div>
            <RouterLink :to="{ name: 'edit-view', params: { id: todo.id } }">
              <button class="btn btn-square btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
              </button>
            </RouterLink>
            <button class="btn btn-square btn-outline ml-2" @click="removeTodo(todo.id)">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>


<style scoped>
svg {
  fill: white;
}
</style>