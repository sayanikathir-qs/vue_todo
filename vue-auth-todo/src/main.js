

import { createApp } from 'vue'
import {createPinia} from 'vue';
import App from './App.vue'
import router from 'vue';
import vuetify from 'vue';

const app  =createApp(App);
app.use(router);
app.use(vuetify);
app.use(createPinia());
app.use(VueCookies);
app.mount('#app');
