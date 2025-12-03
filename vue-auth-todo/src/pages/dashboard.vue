
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
  <div>
    <Header />
    
    <v-container fluid class="py-8 bg-grey-lighten-5">
      <!-- Welcome Section -->
      <v-card class="mb-6">
        <v-card-text>
          <h1 class="text-h4 font-weight-bold mb-2">Welcome, {{ authStore.user?.firstName }}!</h1>
          <p class="text-body1 text-grey-darken-1">Manage your tasks efficiently</p>
        </v-card-text>
      </v-card>

      <!-- Add Task Section -->
      <v-card class="mb-6">
        <v-card-text>
          <div v-if="!showForm" class="d-flex justify-space-between align-center">
            <h2 class="text-h6 font-weight-semibold">My Tasks</h2>
            <v-btn
              color="primary"
              size="large"
              @click="showForm = true"
            >
              + Add Task
            </v-btn>
          </div>

          <div v-else>
            <h2 class="text-h6 font-weight-semibold mb-4">Create New Task</h2>
            <div class="d-flex gap-3">
              <v-text-field
                v-model="newTask"
                label="Task title"
                placeholder="Enter your task..."
                density="compact"
                class="flex-grow-1"
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
        </v-card-text>
      </v-card>

      <!-- Tasks List -->
      <v-card>
        <div v-if="taskStore.tasks.length === 0" class="pa-8 text-center">
          <p class="text-body1 text-grey-darken-1">No tasks yet. Create one to get started!</p>
        </div>

        <div v-else>
          <v-divider />
          <div
            v-for="task in taskStore.tasks"
            :key="task.id"
          >
            <v-card-text class="d-flex align-center justify-space-between pa-4">
              <div class="d-flex align-center gap-4 flex-grow-1">
                <v-checkbox
                  :model-value="task.completed"
                  @update:model-value="toggleTask(task.id)"
                  color="primary"
                />
                <div class="flex-grow-1">
                  <p :class="['text-body1 font-weight-medium', task.completed ? 'text-decoration-line-through text-grey-darken-1' : 'text-grey-darken-3']">
                    {{ task.title }}
                  </p>
                  <p class="text-caption text-grey-darken-1">{{ task.createdAt }}</p>
                </div>
              </div>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deleteTask(task.id)"
              />
            </v-card-text>
            <v-divider />
          </div>

          <!-- Task Statistics -->
          <v-card-text class="bg-grey-lighten-4 d-flex gap-8 pa-4">
            <div>
              <p class="text-caption text-grey-darken-1">Total Tasks</p>
              <p class="text-h6 font-weight-bold text-grey-darken-3">{{ taskStore.tasks.length }}</p>
            </div>
            <div>
              <p class="text-caption text-grey-darken-1">Completed</p>
              <p class="text-h6 font-weight-bold" style="color: #4caf50;">{{ taskStore.tasks.filter(t => t.completed).length }}</p>
            </div>
            <div>
              <p class="text-caption text-grey-darken-1">Pending</p>
              <p class="text-h6 font-weight-bold text-primary">{{ taskStore.tasks.filter(t => !t.completed).length }}</p>
            </div>
          </v-card-text>
        </div>
      </v-card>

      <!-- Logout Button -->
      <div class="mt-8 text-center">
        <v-btn
          color="error"
          size="large"
          @click="authStore.logout"
        >
          Logout
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>

