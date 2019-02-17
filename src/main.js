// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/base.css'
import packageBread from './components/PackageBread.vue'
import HttpServer from './axiosHeader'

Vue.use(HttpServer)

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component('packageBread',packageBread)

Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
