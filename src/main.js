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
 import ElementPlus from 'element-plus' //全局引入
 import 'element-plus/dist/index.css'
const router = createRouter({
    history: createWebHistory(),
    routes:routes.routes
});
createApp(App).use(router).use(ElementPlus).use(store).mount('#app')