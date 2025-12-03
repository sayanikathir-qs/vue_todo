<template>
  <v-app-bar color="primary" density="comfortable" dark>

    <!-- App Title -->
    <v-toolbar-title>Vue Auth Todo</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- User Name -->
    <div v-if="auth.user" class="mr-4">
      {{ auth.user.firstName }} {{ auth.user.lastName }}
    </div>

    <!-- Logout -->
    <v-btn color="red" @click="handleLogout">
      Logout
    </v-btn>

  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>
