<template>
  <div class="pagination-container">
    <div aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
          <a class="page-link" @click.prevent="goToPage(currentPage - 1)">Previous</a>
        </li>

        <li
          v-for="page in pagination.pages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage >= pagination.totalPages }">
          <a class="page-link" @click.prevent="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </div>
    <PageSelector @rows-changed="handleUpdateRow" />
  </div>
</template>

<script setup lang="ts">
import { CONFIG_TABLE } from '@/config/table.config'
import PageSelector from './PageSelector.vue'
import { computed, inject, ref, watch, type Ref } from 'vue'
import type { IProviderDataTable } from '@/types/table.interface'

const props = defineProps<{
  total: number
}>()

const actions = inject<IProviderDataTable>('tableStatus')!

const currentPage = ref(1)

const currenRow = ref(CONFIG_TABLE.rows[0])

const emit = defineEmits(['page-changed', 'rows-changed'])

const pagination = computed<{ totalPages: number; pages: number[] }>(() => {
  const totalPages = Math.ceil(props.total / currenRow.value)
  return { totalPages, pages: Array.from({ length: totalPages }, (_, i) => 1 + i) }
})

const goToPage = (page: number) => {
  currentPage.value = page
}

watch(currentPage, (page: number) => emit('page-changed', page))

watch(actions.shouldResetPage, (newValue) => {
  if (newValue) currentPage.value = 1
  actions.resetPage(false)
})

const handleUpdateRow = (rows: Ref<number>) => {
  currenRow.value = rows.value
  emit('rows-changed', currenRow.value)
}
</script>

<style scoped>
.pagination {
  margin: 0;
  cursor: pointer;
  flex-wrap: wrap;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}

.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
