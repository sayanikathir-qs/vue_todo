<template>

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