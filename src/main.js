import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from '../plugin/element.js'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.token
  return config
})
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')