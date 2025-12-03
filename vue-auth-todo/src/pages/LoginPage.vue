<!-- <template>

    <v-containner class ="fill-height d-flex justify-center align-center">
        <v-card width ="400" class="pa-6">

            <h2 class ="text-center mb-4"> Login </h2>

            <v-form ref="form" @submit.prevent ="submitLogin">
                <v-text-field label ="username" v-model ="username" :rules="[v => !!v || 'UserName is required']" preappend-icon ="mdi-account" density ="compact"/>
                <v-text-field label="Password" v-model="password" type="password":rules="[v => !!v || 'Password is required']"prepend-icon="mdi-lock"density="compact"/>

                <p v-if="error" class="text-red mt-2">{{ error }}</p>

            <v-btn class="mt-4" type="submit" color="primary" block :loading="loading" > Login</v-btn>
            </v-form>

        </v-card>
    </v-container>
</template>

<script setup>
   import {ref} from 'vue'
   import {useAuthstore} from "../stores/auth.js"

</script> -->

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card width="400" class="pa-6">

      <h2 class="text-center mb-4">Login</h2>

      <v-form ref="form" @submit.prevent="submitLogin">
        <v-text-field
          label="Username"
          v-model="username"
          :rules="[v => !!v || 'Username is required']"
          prepend-icon="mdi-account"
          density="compact"
        />

        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          :rules="[v => !!v || 'Password is required']"
          prepend-icon="mdi-lock"
          density="compact"
        />

        <p v-if="error" class="text-red mt-2">{{ error }}</p>

        <v-btn
          class="mt-4"
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Login
        </v-btn>
      </v-form>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const form = ref(null);

const submitLogin = async () => {
  const valid = await form.value.validate();
  if (!valid.valid) return;

  loading.value = true;
  error.value = "";

  try {
    await auth.login(username.value, password.value);
    router.push("/");
  } catch (err) {
    error.value = err.message || "Invalid username or password";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
