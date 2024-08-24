<template>
  <div v-if="store.loading" class="modal-spiner">
    <div>
      <div
        class="spinner-border spinner-center"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountryStore } from '@/stores/conuntryStore'

const store = useCountryStore()
</script>

<style scoped>
.modal-spiner {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgb(80, 78, 78, 0.7);
  z-index: 99999;
}
.modal-spiner .spinner-center,
.modal-spiner span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%, -50%);
}

.modal-spiner span {
  top: 56%;
  color: black;
}
</style>
