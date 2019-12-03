<template>
  <ParentLayout>
    <template #sidebar-top>
      <CarbonAds />
    </template>
    <template #page-bottom>
      <BuySellAds />
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from '@theme/components/CarbonAds.vue'
import BuySellAds from '@theme/components/BuySellAds.vue'

export default {
  name: 'Layout',

  components: {
    ParentLayout,
    CarbonAds,
    BuySellAds
  }
}
</script>
