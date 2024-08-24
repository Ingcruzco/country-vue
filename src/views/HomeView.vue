<template>
  <div v-if="!responsive">
    <DataTable :headers="TABLE_CONFIG.tableColumns" :total="total">
      <ConuntriesContent />
    </DataTable>
  </div>
  <div v-else class="responsive-details-container">
    <ul class="list-group">
      <template v-for="country in store.countries" :key="country.name">
        <li class="list-group-item list-group-item-dark active">{{ country.name }}</li>
        <li class="list-group-item">{{ country.code }}</li>
        <li class="list-group-item">{{ country.name }}</li>
        <li class="list-group-item">{{ country.capital }}</li>
        <li class="list-group-item">{{ country.continent.name }}</li>
        <li class="list-group-item">{{ country.currency }}</li>
        <li class="list-group-item">
          <td scope="col" v-if="country.states.length > 0">
            <ActionButton :code="country.code" />
          </td>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import ConuntriesContent from '@/components/ConuntriesContent.vue'
import DataTable from '@/components/DataTable.vue'
import TABLE_CONFIG from '@/constants/table'
import { useCountryStore } from '@/stores/conuntryStore'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const store = useCountryStore()

const total = computed(() => store.dataFilered.length)

const responsive = ref(false)

const handleResize = () => {
  responsive.value = window.innerWidth < 600
}

onMounted(() => {
  window.scrollTo(0, 0)
  handleResize()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
