<template>
  <div class="content content-loading">
    <ContentLoader
      :height="120"
      :width="300"
      :speed="0.5"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="5" rx="5" ry="5" width="117" height="10"/>
      <rect x="0" y="25" rx="5" ry="5" width="85" height="10"/>
      <rect x="0" y="60" rx="5" ry="5" width="250" height="10"/>
      <rect x="0" y="80" rx="5" ry="5" width="280" height="10"/>
      <rect x="0" y="100" rx="5" ry="5" width="201" height="10"/>
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  components: {
    ContentLoader
  },

  data () {
    return {
      containerStyle: {}
    }
  }
}
</script>

<style>
  @media screen and (min-width: 719px) {
    .content.content-loading > svg {
      max-width: 400px !important;
    }
  }
  @media screen and (max-width: 719px) {
    .content.content-loading > svg {
      max-width: 320px !important;
    }
  }

</style>
