import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/Home.vue'
import AboutView from './pages/About.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router
