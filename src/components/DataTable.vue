<template>
  <InputSearch @search-changed="handleSearchChanged" />
  <table class="table table-striped table-hover shadow-form-1">
    <TableContent :headers="props.headers">
      <slot></slot>
    </TableContent>
  </table>
  <PaginatorTable
    @page-changed="handlePageChange"
    @rows-changed="handleRowsChange"
    :total="props.total"
  />
</template>

<script setup lang="ts">
import type { IHeaders } from '@/types/table.interface'
import PaginatorTable from './PaginatorTable.vue'
import TableContent from './TableContent.vue'
import { provide, ref } from 'vue'
import { CONFIG_TABLE } from '@/config/table.config'
import InputSearch from './InputSearch.vue'

const props = defineProps<{
  headers: IHeaders[]
  total: number
}>()

const page = ref(1)
const rows = ref(CONFIG_TABLE.rows[0])
const search = ref('')

const shouldResetPage = ref(false)

const handlePageChange = (newPage: number) => {
  page.value = newPage
}
const handleRowsChange = (newRows: number) => {
  rows.value = newRows
}

const handleSearchChanged = (newSearch: string) => {
  search.value = newSearch
}

const resetPage = (flag: boolean) => {
  shouldResetPage.value = flag
}

provide('tableStatus', {
  rows,
  page,
  search,
  shouldResetPage,
  resetPage
})
</script>

<style lang="css">
table tr th {
  font-weight: bold;
  text-align: left;
}

table tr {
  height: 4rem;
}

table tr td {
  max-width: 8rem;
}
</style>
