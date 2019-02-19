import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import List from '@/components/list.vue'
import rightsList from '@/components/rights.vue'
import rolesList from '@/components/roles.vue'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/list',
        name: 'list',
        component: List
      }, {
        path: '/rightsList',
        name: 'rightsList',
        component: rightsList
      }, {
        path: '/roles',
        name: 'roles',
        component: rolesList
      }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) =>{
  if(to.name==='login'){
    next()
  }else{
    const token = localStorage.getItem('token')
    if(!token){
      Message.warning('请先登录')
      router.push({name:'login'})
      return
    }
    next()
  }
}) 

export default router