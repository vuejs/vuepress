<template>
  <ParentLayout>
    <CarbonAds slot="sidebar-top"/>
    <BuySellAds slot="page-bottom"/>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from '../components/CarbonAds.vue'
import BuySellAds from '../components/BuySellAds.vue'

export default {
  components: {
    ParentLayout,
    CarbonAds,
    BuySellAds
  }
}
</script>
