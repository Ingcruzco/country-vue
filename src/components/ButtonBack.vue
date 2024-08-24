<template>
  <div class="container" v-if="isDetailsRoute">
    <router-link to="/">
      <a
        class="btn btn-outline-dark d-flex align-items-center border-2 border-dark rounded-pill py-2 px-3 shadow-sm"
      >
        <i class="bi bi-arrow-left me-2"></i> Return
      </a>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isDetailsRoute = computed(() => (route.name?.toString().indexOf('details') ?? -1) > -1)
</script>

<style scoped>
.container {
  min-width: 10rem;
  width: 10%;
  margin-left: 0;
}

.btn-outline-dark {
  border-width: 2px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #000;
}
.container a {
  text-decoration: none;
  justify-content: space-around;
}

.btn-outline-dark:hover {
  background-color: #000;
  color: #fff;
  border-color: #000;
}
</style>
