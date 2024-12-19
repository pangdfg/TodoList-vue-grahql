<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

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
  return todoStore.list.filter(todo => todo.status === selectedStatus.value)
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
  try {
    if (event.target.checked) {
      await updateStatus(todoId, 'Done')
      await todoStore.loadTodos() 
    }
  } catch (error) {
    console.log('error', error)
  }
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
    <div class="flex">
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
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!-- SVG path --></svg>
              </button>
            </RouterLink>
            <button class="btn btn-square btn-outline ml-2" @click="removeTodo(todo.id)">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!-- SVG path --></svg>
            </button>
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