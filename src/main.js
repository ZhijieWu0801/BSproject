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
import store from './store/index.js'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
import BaseUrl from './comoneJS/baseUrl.js'
const router = createRouter({
    history: createWebHistory(),
    routes: routes.routes
});
import md5 from 'md5'
window.md5 = md5
const app = createApp(App).use(router).use(ElementPlus).use(store)
app.config.globalProperties.$BaseUrl = BaseUrl;
// const  Api = require('./api/api.js')
import Api from './api/api.js'

app.config.globalProperties.$Api = Api;
app.mount('#app');