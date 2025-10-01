import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router'
import { createPinia } from 'pinia'


const myApp = createApp(App)
myApp.use(router)
myApp.use(createPinia())
myApp.mount('#app')