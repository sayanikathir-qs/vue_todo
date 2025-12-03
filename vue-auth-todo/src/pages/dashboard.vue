
<script setup>
import { useAuthStore } from '@/stores/auth';

const authstore = UseAuthStore ()
</script>

<template>
  <div>Home Page</div>
  <p> {{ authStore.isAuthenticated }}</p>
  <v-btn @click="authStore.logout">Logout</v-btn>
</template>

