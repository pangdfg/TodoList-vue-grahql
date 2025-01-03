<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { useRoute, RouterLink } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'
import { isLoggedIn, checkAuth } from '@/stores/UserStore';


import Loading from '@/components/Loading.vue'

export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  created() {
    this.loggedIn = isLoggedIn();
    if (!this.loggedIn) {
      checkAuth();
    }
    const token = localStorage.getItem("token");
  },
};

const todoStore = useTodoStore()
const route = useRoute()

const todoData = ref(null);
const isLoading = ref(false)
const isUpdated = ref(false)

const editTodo = async (todoData, todoId) => {
  if (!todoData.name.trim()) {
    alert('Item name cannot be empty.');
    return;
  }
  try {
    isLoading.value = true
    await todoStore.editTodo(todoData, todoId)
    isUpdated.value = true
    isLoading.value = false

    setTimeout(() => {
      isUpdated.value = false
    }, 2000)
  } catch (error) {
    console.log('error', error)
  }
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const id = parseInt(route.params.id);
    if (isNaN(id)) throw new Error('Invalid ID');
    todoData.value = await todoStore.loadTodo(id);
    console.log(todoData)
    if (!todoData.value) throw new Error('Todo not found');
  } catch (error) {
    console.error('Error fetching todo:', error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
<div class="min-h-screen">
  <header class=" justify-between">
    </header>
    <UserLayout> 
    <div class="max-w-4xl mx-auto p-4 mb-auto center">
  <div class="w-1/2 mx-auto">
    <div class="flex items-center">
      <div v-if="isLoading" class="flex justify-center items-center h-full">
  <Loading />
</div>

      <RouterLink :to="{ name: 'todo-view' }">
        <button class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>
      </RouterLink>
      <div class="ml-2">
        Edit
      </div>
    </div>

    <div class="flex flex-col" v-if="isLoaded">
      <div class="flex gap-4">
        <div class="text-sm ml-1">Item id</div>
        <span class="badge badge-primary">{{ todoData.id }}</span>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Item name</span>
        </label>
        <input class="input input-bordered w-full" type="text" v-model="todoData.name">
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Status</span>
        </label>
        <select class="select select-bordered" v-model="todoData.status">
          <option
            v-for="status in todoStore.statuses"
            :key="status"
            :value="status"
            >
            {{ status }}
          </option>
        </select>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary w-full" @click="editTodo(todoData, todoData.id)">
          Update
        </button>
      </div>
    </div>
    <div class="toast toast-top toast-start">
      <div v-show="isUpdated" class="alert alert-success">
        <span>Update successful.</span>
      </div>
    </div>
  </div>
  </div>
  </UserLayout> 
  </div>
</template>

<style scoped>
svg {
  fill: white;
}
</style>