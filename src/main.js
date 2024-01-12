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
console.log(routes);
const router = createRouter({
    history: createWebHistory(),
    routes:routes.routes
});
createApp(App).use(router).mount('#app')