import { createLocalVue } from '@vue/test-utils'
import OutboundLink from '@/default-theme/OutboundLink.vue'

import dataMixin from '@/app/dataMixin'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.mixin(dataMixin)
localVue.use(VueRouter)
localVue.component('OutboundLink', OutboundLink)

export default localVue
