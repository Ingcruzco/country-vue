<template>
  <router-link :to="`/details/${countryCode}`">
    <button class="btn btn-outline-primary">
      <i class="bi bi-eye"></i>
    </button>
  </router-link>
</template>

<script setup lang="ts">
import type { ICountry } from '@/types/country.interface'
import { defineProps } from 'vue'

const props = defineProps<Pick<ICountry, 'code'>>()

const countryCode = props.code
</script>
