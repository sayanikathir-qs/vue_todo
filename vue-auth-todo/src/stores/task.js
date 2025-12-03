import { apiClient } from "@/utils/api";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import router from "@/plugins/router";

export const useAuthStore = defineStore('auth', () => {
    let tasks = reactive()
})