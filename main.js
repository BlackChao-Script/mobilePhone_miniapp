import App from './App'
import Vue from 'vue'
import store from './store/store.js'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

const app = new Vue({
	store,
	...App
})

require('@/utils/http.interceptor.js')(app)

app.$mount()
