<template>
  <select v-model="currentRow" @change="handleRowChanged" class="page-selector">
    <template v-for="row in CONFIG_TABLE.rows" :key="row">
      <option>{{ row }}</option>
    </template>
  </select>
</template>

<script setup lang="ts">
import { CONFIG_TABLE } from '@/config/table.config'
import { ref } from 'vue'

const currentRow = ref(CONFIG_TABLE.rows[0])

const emit = defineEmits(['rows-changed'])

const handleRowChanged = () => {
  emit('rows-changed', currentRow)
}
</script>

<style scoped>
.page-selector {
  height: 2rem;
  margin-left: 0.5rem;
}

.page-selector:focus {
  outline: none;
}
</style>
