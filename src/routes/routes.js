// import Login from "../components/Login.vue"
import test from "../components/test.vue"
import HelloWorld from "../components/HelloWorld.vue"
import index from '../components/index.vue'
const routes = [
    {
        name: 'index',
        path: '/',
        component: index
    },
    // {
    //     name:'/',
    //     path: '/login',
    //     component: Login
    // },
    {
        name: 'test',
        path: '/test',
        component: test
    },
    {
        name: 'HelloWorld',
        path: '/HelloWorld',
        component: HelloWorld
    },
    {
        name: 'home',
        path: '/home',
        component: import("../components/Home.vue")
    },
]
const exports = {
    routes
}
export default exports