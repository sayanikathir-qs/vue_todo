
<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
</script>

<template>
  <div>Home Page</div>
  <p> {{ authStore.isAuthenticated }}</p>
  <v-btn @click="authStore.logout">Logout</v-btn>
</template>

