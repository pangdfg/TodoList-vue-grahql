<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

</script>

<template>
<UserLayout>
  <div class="bg-gray-200 bg-no-repeat bg-cover min-h-screen content-center ">
    <div class="container mx-auto flex flex-col items-center py-12 sm:py-24">
      <div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
          Welcome To
          <span class="text-indigo-700">Todolist</span>
          Website 
        </h1>
        <p class="mt-5 sm:mt-10 lg:w-10/12 text-gray-800 font-normal text-center text-sm sm:text-lg">A professional to-do list website helps you stay organized and productive. Create, manage, and track your tasks online with ease. </p>
      </div>
      <div class="flex justify-center items-center">
        <RouterLink :to="{ name: 'login' }">
        <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Sign In</button>
        </RouterLink>
        <RouterLink :to="{ name: 'register' }">
        <button class="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">Sign Up</button>
        </RouterLink>
      </div>
    </div>
  </div>
</UserLayout>
</template>
