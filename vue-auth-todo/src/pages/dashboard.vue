<!-- <script setup>
import { ref, onMounted } from "vue";
import Header from "@/components/layouts/Header.vue";
import { useAuthStore } from "@/stores/auth";
import { useTaskStore } from "@/stores/task";

const authStore = useAuthStore();
const taskStore = useTaskStore();

const newTask = ref("");
const showForm = ref(false);

onMounted(() => {
  taskStore.fetchTasks();
});

const addTask = async () => {
  if (newTask.value.trim()) {
    await taskStore.createTask(newTask.value);
    newTask.value = "";
    showForm.value = false;
  }
};

const toggleTask = async (id) => {
  await taskStore.toggleTask(id);
};

const deleteTask = async (id) => {
  await taskStore.removeTask(id);
};
</script> -->

<script setup>
import { useTodoStore } from "@/stores/todo";
import { onMounted, ref } from "vue";

const store = useTodoStore();
const newTask = ref("");

onMounted(() => {
  store.loadTodos();
});

function addTask() {
  if (!newTask.value.trim()) return;
  store.addTodo(newTask.value);
  newTask.value = "";
}
</script>

<template>
  <div>
    <h1>My Todos</h1>

    <input v-model="newTask" placeholder="New Todo" />
    <button @click="addTask">Add</button>

    <ul>
      <li v-for="todo in store.todos" :key="todo.id">
        <input 
          type="checkbox"
          :checked="todo.completed"
          @change="store.toggleComplete(todo.id, todo.completed)"
        />

        {{ todo.todo }}   <!-- ✅ FIXED HERE -->

        <button @click="store.removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
