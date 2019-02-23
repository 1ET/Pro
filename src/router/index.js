import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui';
const Login = () => import('@/components/login.vue')
const Home = () => import('@/components/home.vue')
const List = () => import('@/components/list.vue')
const rightsList = () => import('@/components/rights.vue')
const rolesList = () => import('@/components/roles.vue')
const goodsList = () => import('@/components/goodslist.vue')
const goodsAdd = () => import('@/components/goodsadd.vue')
const goodsParams = () => import('@/components/goodsParams.vue')
const orders = () => import('@/components/order.vue')
const categories = () => import('@/components/Goodscate.vue')
const reports = () => import('@/components/reports.vue')

Vue.use(VueRouter)

const router = new VueRouter({
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
      }, {
        path: '/goods',
        name: 'goods',
        component: goodsList
      }, {
        path: '/goodsadd',
        name: 'goodsadd',
        component: goodsAdd
      }, {
        name: 'params',
        path: '/params',
        component: goodsParams
      }, {
        name: 'orders',
        path: '/orders',
        component: orders
      }, {
        name: 'categories',
        path: '/categories',
        component: categories
      }, {
        name: 'reports',
        path: '/reports',
        component: reports
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

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('请先登录')
      router.push({ name: 'login' })
      return
    }
    next()
  }
})

export default router