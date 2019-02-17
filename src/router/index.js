import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import List from '@/components/list.vue'
import rightsList from '@/components/rights.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/list',
        name: 'list',
        component: List
      },{
        path:'/rightsList',
        name:'rightsList',
        component:rightsList
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
