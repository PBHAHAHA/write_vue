import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/monitor'
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('../views/monitor/index.vue')
  },
  {
    path: '/strategy',
    name: 'Strategy',
    component: () => import('../views/strategy/index.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('../views/analysis/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
