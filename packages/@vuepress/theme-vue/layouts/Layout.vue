<template>
  <Layout>
    <CarbonAds slot="sidebar-top"/>
    <BuySellAds slot="page-bottom"/>
  </Layout>
</template>

<script>
import Layout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from '../components/CarbonAds.vue'
import BuySellAds from '../components/BuySellAds.vue'

export default {
  components: {
    Layout,
    CarbonAds,
    BuySellAds
  },

  mounted () {
    console.log('mounted')
  }
}
</script>
