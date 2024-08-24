<template>
  <div class="input-container">
    <div class="input-search input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
        aria-label="Search"
        v-model="searchQuery"
        @input="onSearch"
      />
      <button class="btn btn-outline-secondary" type="button" @click="clearSearch">Clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { debounce } from 'lodash'
import type { IProviderDataTable } from '@/types/table.interface'

const searchQuery = ref('')

const action = inject<IProviderDataTable>('tableStatus')!

const emit = defineEmits(['search-changed'])

const debouncedSearchQuery = debounce(() => {
  action.resetPage(true)
  emit('search-changed', searchQuery.value)
}, 500)

const clearSearch = () => {
  searchQuery.value = ''
  debouncedSearchQuery()
}

const onSearch = () => {
  debouncedSearchQuery()
}
</script>

<style>
.input-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.input-search {
  width: 30% !important;
}

@media screen and (max-width: 730px) {
  .input-search {
    width: 80% !important;
  }
}
</style>
