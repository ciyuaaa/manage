import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Welcome = () => import('views/welcome/Welcome')
const Users = () => import('views/users//Users')
const Rights = () => import('views/rights/Rights')
const Roles = () => import('views/roles/Roles')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'welcome',
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'users',
        component: Users
      },
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'roles',
        component: Roles
      },
      {
        path: 'rights',
        component: Rights
      },
      // {
      //   path: 'reports',
      //   component: Reports
      // },
      // {
      //   path: 'params',
      //   component: Params
      // },
      // {
      //   path: 'orders',
      //   component: Orders
      // },
      // {
      //   path: 'goods',
      //   component: Goods
      // },
      // {
      //   path: 'categories',
      //   component: Categories
      // }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !sessionStorage.token) next('/login')
  else next()
})

export default router
