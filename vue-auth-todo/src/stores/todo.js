// import { api } from "@/utils/api";
// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useTaskStore = defineStore('task', () => {
//     let tasks = ref([])
    
//     function addTask(task) {
//         tasks.value.push(task)
//     }
    
//     function removeTask(id) {
//         tasks.value = tasks.value.filter(t => t.id !== id)
//     }
    
//     return { tasks, addTask, removeTask }
// })

import { defineStore } from "pinia";
import { ref } from "vue";

import { todoApi } from '../utils/todoapi'

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([]);

  // Load all todos from backend
  async function loadTodos() {
    const res = await todoApi.get("/todos");
    todos.value = res.data;
  }

  // Add a new todo
  async function addTodo(title) {
    const res = await todoApi.post("/todos", {
      todo: title,
      completed: false ,
      userId :1 
    });
    todos.value.push(res.data);
  }

  // Toggle completed
  async function toggleComplete(id, completed) {
    await todoApi.put(`/todos/${id}`, { completed: !completed });

    const t = todos.value.find(t => t.id === id);
    t.completed = !t.completed;
  }

  // Delete todo
  async function removeTodo(id) {
    await todoApi.delete(`/todos/${id}`);
    todos.value = todos.value.filter(t => t.id !== id);
  }

  return { todos, loadTodos, addTodo, toggleComplete, removeTodo };
});
