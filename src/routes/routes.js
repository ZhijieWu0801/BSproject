import test from "../components/test.vue"
const routes = [{
        name: 'login',
        path: '/',
        component: () => import("../components/Login.vue")
    },
    {
        name: 'test',
        path: '/test',
        component: test
    },
    {
        name: 'HelloWorld',
        path: '/HelloWorld',
        component: ()=>import("../components/HelloWorld.vue")
    },
    {
        name: 'home',
        path: '/home',
        component: () => import("../components/Home.vue")
    },
    {
        name: 'app',
        path: '/app',
        component: () => import("../App.vue")
    },
    {
        name: 'addAdmin',
        path: '/addAdmin',
        component: () => import("../components/AddAdmin.vue")
    },
    {
        name: 'deleteAdmin',
        path: '/deleteAdmin',
        component: () => import("../components/DelateAdmin.vue")
    },
    {
        name: 'updataAdmin',
        path: '/updataAdmin',
        component: () => import("../components/UpdataAdmin.vue")
    },
    {
        name: 'selectAdmin',
        path: '/selectAdmin',
        component: () => import("../components/SelectAdmin.vue")
    },
    {
        name: 'addPet',
        path: '/addPet',
        component: () => import("../components/AddPet.vue")
    },
    {
        name: 'updataPet',
        path: '/updataPet',
        component: () => import("../components/updataPet.vue")
    },
    {
        name: 'myInfo',
        path: '/myInfo',
        component: () => import("../components/MyInfo.vue")
    },
]
const exports = {
    routes
}
export default exports