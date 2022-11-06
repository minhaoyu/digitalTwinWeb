import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LiveData from '@/views/LiveData.vue'
import Chart from '@/views/Chart.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/liveData',
    name: 'LiveData',
    component: LiveData,
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
