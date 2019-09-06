import Vue from 'vue'
import _ from 'lodash'
import ElementUI from 'element-ui'
// require('@/static/theme/index.css')
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/common/filters'
import config from '@/common/config'
import data from '@/common/data/index'
import App from '@/common/App'
import router from './router/index'
import store from './store/index'
import axios from '@/common/utils/axios'
import VForm from '@/common/components/VForm'
import VCard from '@/common/components/VCard'
import NotSubRouter from '@/common/layouts/components/NotSubRouter'

import './router/permission'

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.use(ElementUI)

// global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// global components
Vue.component('VForm', VForm)
Vue.component('VCard', VCard)
Vue.component('NotSubRouter', NotSubRouter)

Vue.prototype._ = _
Vue.prototype.$config = config
Vue.prototype.$v_data = data
Vue.config.productionTip = false

if (config.is_prod) {
  require('@/static/iconfont/iconfont.css')
}

const baseURL = config.base_url

Vue.use(axios, {
  router,
  store,
  baseURL,
  needAuth: true
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
