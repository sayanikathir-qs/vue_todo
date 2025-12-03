import { api } from "@/utils/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore('task', () => {
    let tasks = ref([])
    
    function addTask(task) {
        tasks.value.push(task)
    }
    
    function removeTask(id) {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }
    
    return { tasks, addTask, removeTask }
})