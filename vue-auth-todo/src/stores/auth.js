import { apiClient } from "@/utils/apiClient";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import router from "@/plugins/router";

export const useAuthStore = defineStore('auth', () => {

    let user = ref(JSON.parse(localStorage.getItem('user')) || null)

    let isAuthenticated = computed(() => {
        return !!user.value
    })
    const isLoginFormValid = ref(false)
    let error = ref(null)
    let isSubmitting = ref(false)
    const loginForm = ref()

    let loginFormData = reactive({
        username: "",
        password: ""
    })

    async function login() {
        error.value = null
        isSubmitting.value = true

        try {
            const resp = await apiClient.post('/user/login', {
                username: loginFormData.username,
                password: loginFormData.password,
                expiresInMins: 30,
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            user.value = resp.data

            resetLoginFormData()
            return router.replace({ name: 'Home' })
        } catch (err) {
            console.log(err)
            if (err.status === 400) {
                error.value = "Invalid Credentials. Please try again"
                return false
            }
            error.value = "Something went wrong, please try again"
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    function resetLoginFormData() {
        loginForm?.value?.reset()
    }

    function logout() {
        user.value = null
        return router.replace({ name: 'Login' })
    }

    return { isAuthenticated, loginFormData, isLoginFormValid, login, error, isSubmitting, user, logout, loginForm }
})