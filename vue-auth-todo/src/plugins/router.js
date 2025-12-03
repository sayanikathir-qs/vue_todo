import { createWebHistory, createRouter } from "vue-router";

import LoginPage from "@/pages/LoginPage.vue";
import HomePage from "@/pages/HomePage.vue";
import { useAuthStore } from "@/stores/authStore";

const routes = [
    {
        path: "/", name: "Home", component: HomePage, meta: {
            requiresAuth: true
        }
    },
    { path: "/login", name: "Login", component: LoginPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'Login' }
    }

    if (authStore.isAuthenticated && to.name === 'Login') {
        return { name: 'Home' }
    }
})

export default router