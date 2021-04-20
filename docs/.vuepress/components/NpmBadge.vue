<template>
  <a
    :href="badgeLink"
    :title="package"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img :src="badgeImg" :alt="package" />
  </a>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineProps } from 'vue'

const props = defineProps({
  package: {
    type: String,
    required: true,
  },
  distTag: {
    type: String,
    required: false,
    default: 'next',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
})

const badgeLink = computed(
  () => `https://www.npmjs.com/package/${props.package}`
)
const badgeImg = computed(
  () =>
    `https://badgen.net/npm/v/${props.package}/${props.distTag}${
      props.label ? `label=${props.label}` : ''
    }`
)
</script>
