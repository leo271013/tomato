import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    meta: {
      title: '番茄鐘'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
  },
  {
    path: '/progress',
    name: 'Progress',
    meta: {
      title: '番茄鐘 | 進行中'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "progress" */ '../views/Progress.vue')
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
