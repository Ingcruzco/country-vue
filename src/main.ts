import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

const app = createApp(App)

const pinia = createPinia()

app.use(bootstrap)
app.use(pinia)
app.use(router)
app.mount('#app')
