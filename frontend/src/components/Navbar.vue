<template>
  <nav class="navbar">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        My App
      </RouterLink>
      <div class="navbar-links">
        <RouterLink to="/" class="navbar-link">Home</RouterLink>
        <RouterLink to="/todo-view" class="navbar-link">Todos</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-brand {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
}

.navbar-links {
  display: flex;
}

.navbar-link {
  margin-left: 1rem;
  color: white;
  text-decoration: none;
}

.navbar-link:hover {
  text-decoration: underline;
}
</style>
