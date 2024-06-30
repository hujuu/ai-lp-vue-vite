<script setup lang="ts">
import { ref } from 'vue'

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
</script>

<template>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Home </RouterLink>
    <RouterLink to="/about"> About</RouterLink>
    <RouterLink to="/demo"> Demo</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
