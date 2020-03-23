import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontHome from '../views/front/FrontHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component:() => import('../views/backstage/Login.vue')
  },
  {
    path: '/backstage',
    name: '首页',
    component: () => import('../views/backstage/Backstage.vue'),
    children:[
      {
        path:'/user',
        name:'用户管理',
        component:()=> import("../views/system/blogUser/BlogUser.vue")
      },
      {
        path:'/role',
        name:'角色管理',
        component:()=> import("../views/system/blogRole/BlogRole.vue")
      }
    ]
  },
  {
    path:'/test2',
    component:()=> import("../views/test/test3.vue")
  },
  {
    path:'*',
    redirect:'/backstage'
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
