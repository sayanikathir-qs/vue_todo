
<script setup>
import { useAuthStore } from '@/stores/auth';
import { useTaskStore } from '@/stores/task';
import Header from '@/components/layouts/Header.vue';
import { ref } from 'vue';

const authStore = useAuthStore();
const taskStore = useTaskStore();

const newTask = ref('');
const showForm = ref(false);

const addTask = () => {
  if (newTask.value.trim()) {
    taskStore.addTask({
      id: Date.now(),
      title: newTask.value,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    });
    newTask.value = '';
    showForm.value = false;
  }
};

const toggleTask = (id) => {
  const task = taskStore.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
};

const deleteTask = (id) => {
  taskStore.removeTask(id);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome, {{ authStore.user?.firstName }}!</h1>
        <p class="text-gray-600">Manage your tasks efficiently</p>
      </div>

      <!-- Add Task Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div v-if="!showForm" class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">My Tasks</h2>
          <v-btn
            color="primary"
            size="large"
            @click="showForm = true"
          >
            + Add Task
          </v-btn>
        </div>

        <div v-else>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
          <div class="flex gap-3">
            <v-text-field
              v-model="newTask"
              label="Task title"
              placeholder="Enter your task..."
              density="compact"
              class="flex-1"
              @keyup.enter="addTask"
            />
            <v-btn
              color="primary"
              @click="addTask"
              :disabled="!newTask.trim()"
            >
              Add
            </v-btn>
            <v-btn
              variant="outlined"
              @click="showForm = false"
            >
              Cancel
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Tasks List -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div v-if="taskStore.tasks.length === 0" class="p-8 text-center">
          <p class="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
        </div>

        <div v-else>
          <div class="divide-y">
            <div
              v-for="task in taskStore.tasks"
              :key="task.id"
              class="p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div class="flex items-center gap-4 flex-1">
                <v-checkbox
                  :model-value="task.completed"
                  @update:model-value="toggleTask(task.id)"
                  color="primary"
                />
                <div class="flex-1">
                  <p :class="['text-lg font-medium', task.completed ? 'line-through text-gray-400' : 'text-gray-800']">
                    {{ task.title }}
                  </p>
                  <p class="text-sm text-gray-500">{{ task.createdAt }}</p>
                </div>
              </div>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deleteTask(task.id)"
              />
            </div>
          </div>

          <!-- Task Statistics -->
          <div class="bg-gray-50 p-4 flex gap-6 border-t">
            <div>
              <p class="text-gray-600 text-sm">Total Tasks</p>
              <p class="text-2xl font-bold text-gray-800">{{ taskStore.tasks.length }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Completed</p>
              <p class="text-2xl font-bold text-green-600">{{ taskStore.tasks.filter(t => t.completed).length }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Pending</p>
              <p class="text-2xl font-bold text-blue-600">{{ taskStore.tasks.filter(t => !t.completed).length }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="mt-8 flex justify-center">
        <v-btn
          color="error"
          size="large"
          @click="authStore.logout"
        >
          Logout
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>

