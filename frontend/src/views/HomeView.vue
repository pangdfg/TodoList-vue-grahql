<template>
  <div>
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
    <div>
      <RouterLink :to="{ name: 'todo-view' }">
        <button>Todo</button>
      </RouterLink>
    </div>
  </div>
</template>
