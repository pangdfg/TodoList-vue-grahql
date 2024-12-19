<template>
  <div class="loading-spinner">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" stroke="#4fa94d" stroke-width="5" fill="none" />
    </svg>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: auto;
}

.loading-spinner svg {
  animation: spin 1s linear infinite;
  width: 50px;
  height: 50px;
}

.loading-spinner p {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
