<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar></Navbar>
    <div class="max-w-3xl mx-auto my-0 p-4">
      <RouterView />
    </div>
  </div>
</template>