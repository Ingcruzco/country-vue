<template>
  <div class="details-container">
    <div class="card transparent card-content">
      <img
        :src="`https://flagsapi.com/${code}/shiny/64.png`"
        :alt="`flag_${code}`"
        loading="lazy"
      />
      <div class="card-body">
        <h2>{{ country?.name }}</h2>
        <p class="card-text">
          Did you know that {{ country?.name }} has {{ country?.states.length }} states/provinces?
        </p>
      </div>
    </div>

    <div class="states-container">
      <DataTable :headers="TABLE_CONFIG.tableStateColumns" :total="total">
        <StateContent />
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import type { ICountry } from '@/types/country.interface'
import DataTable from '@/components/DataTable.vue'
import TABLE_CONFIG from '@/constants/table'
import StateContent from '@/components/StateContent.vue'
import { useCountryStore } from '@/stores/conuntryStore'

const route = useRoute()

const { code } = route.params

const store = useCountryStore()

const countries = computed(() => [...store.countries])

const country = computed(() => {
  const currentCountry = countries.value.filter((c) => c.code === code)
  return currentCountry.pop()
})

const total = computed(() => {
  return store.dataDetailsFilered.length
})

provide('country', country)

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.details-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.details-container .states-container {
  margin-left: 4rem;
  width: 30%;
}

.details-container .states-container .width-modified {
  width: 80%;
  margin: auto;
}

.details-container .transparent {
  background-color: rgba(255, 255, 255, 0.8);
}

.details-container .card-content {
  width: 18rem;
  height: 29rem;
}

@media screen and (max-width: 730px) {
  .details-container {
    flex-direction: column;
  }
  .details-container .states-container {
    width: 90%;
    margin-top: 2rem;
  }
  .details-container .card-content {
    width: 70%;
    margin: auto;
  }
}
</style>
