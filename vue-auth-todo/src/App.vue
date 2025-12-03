
<template>
  <v-app>
    <Navbar v-if="auth.token" />
      <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from "./components/layout/Header.vue";
import { useAuthStore } from "./stores/authStore";

const authStore = useAuthStore();

authStore.$subscribe((mutation, state) => {
  localStorage.setItem('user', JSON.stringify(state.user))
})

</script>