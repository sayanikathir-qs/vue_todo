<template>
  <div>
    <v-form ref="form" @submit.prevent="submitLogin">
      <v-text-field
        label="Username"
        v-model="auth.loginFormData.username"
        :rules="[v => !!v || 'Username is required']"
        prepend-icon="mdi-account"
        density="compact"
        class="mb-4"
      />

      <v-text-field
        label="Password"
        v-model="auth.loginFormData.password"
        type="password"
        :rules="[v => !!v || 'Password is required']"
        prepend-icon="mdi-lock"
        density="compact"
        class="mb-4"
      />

      <v-alert
        v-if="auth.error"
        type="error"
        class="mb-4"
      >
        {{ auth.error }}
      </v-alert>

      <v-btn
        class="w-full"
        type="submit"
        color="primary"
        size="large"
        :loading="auth.isSubmitting"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const form = ref(null);

const submitLogin = async () => {
  const valid = await form.value.validate();
  if (!valid.valid) return;

 
  auth.loginFormData.username = auth.loginFormData.username;
  auth.loginFormData.password = auth.loginFormData.password;
  
  await auth.login();
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>

