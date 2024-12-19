<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen ">
    
    <main class="">
      <RouterView />
    </main>
    <footer class="justify-between sticky top-[100vh]">
      <Footer  />
    </footer>
  </div>
</template>
