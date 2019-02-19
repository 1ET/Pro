import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import List from '@/components/list.vue'
import rightsList from '@/components/rights.vue'
import rolesList from '@/components/roles.vue'
import goodsList from '@/components/goodslist.vue'
import { Message } from 'element-ui'
import goodsAdd from'@/components/goodsadd.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/users',
        name: 'list',
        component: List
      }, {
        path: '/rights',
        name: 'rightsList',
        component: rightsList
      }, {
        path: '/roles',
        name: 'roles',
        component: rolesList
      },{
        path:'/goods',
        name:'goods',
        component:goodsList
      },{
        path:'/goodsadd',
        name:'goodsadd',
        component:goodsAdd
      }
    ]
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