import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './pages/Home.vue'
import About from './pages/About.vue'
import Demo from "./pages/Demo.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: About },
    { path: '/demo', component: Demo },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
