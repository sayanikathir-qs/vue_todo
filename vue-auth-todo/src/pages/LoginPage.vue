<script setup>
import LoginForm from "@/components/forms/Loginform.vue";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <v-card class="w-full max-w-md px-8 py-12">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p class="text-gray-600">Login to your account</p>
      </div>
      <v-divider class="my-6"></v-divider>
      <LoginForm />
    </v-card>
  </div>
</template>