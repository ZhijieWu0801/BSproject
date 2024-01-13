import {
    createApp
} from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'
import './style.css'
import App from './App.vue'
import 
    routes
 from "./routes/routes.js"
 import store from './store'
const router = createRouter({
    history: createWebHistory(),
    routes:routes.routes
});
createApp(App).use(router).use(store).mount('#app')