import { registerPlugins } from '@/plugins'
import '@/assets/main.css'
import 'uno.css'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles


const app = createApp(App)

registerPlugins(app)

app.mount('#app')