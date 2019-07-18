import Vue from 'vue'
import _ from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from '@/common/filters'
import config from '@/common/config'
import data from '@/common/data/index'
import App from './App'
import router from './router/index'
import store from './store/index'
import axios from '@/common/utils/axios'
import vCard from '@/common/components/Card'
import NotSubRouter from '@/common/components/NotSubRouter'

import './router/permission'

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.use(ElementUI)

// global filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
// global components
Vue.component('vCard', vCard)
Vue.component('NotSubRouter', NotSubRouter)

Vue.prototype._ = _
Vue.prototype.$config = config
Vue.prototype.$v_data = data
Vue.config.productionTip = false

if (config.is_prod) {
    require('@/static/iconfont/iconfont.css')
}

const baseURL = config.is_prod ? config.server_url : config.dev_server_url

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
