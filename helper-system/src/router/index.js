import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
            // component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: () => import('../components/Welcome.vue'), name: 'welcome'},
                { path: '/activity/list', component: () => import('../components/activity/List.vue'), name: 'activity-list'},
                { path: '/activity/add', component: () => import('../components/activity/Add.vue'), name: 'activity-add'},
                { path: '/user/list', component: () => import('../components/user/List.vue'), name: 'user-list'},
                { path: '/user/add', component: () => import('../components/user/Add.vue'), name: 'user-add'},
            ]
        }
    ]
})

// lt
// 挂载导航守卫
// router.beforeEach((to, from, next) => {
//     // to 将要访问的路径
//     // from 代表从哪个路径跳转而来
//     // next 是一个函数，代表放行: next()放行 ，next('/login')强制跳转

//     if (to.path === '/login') return next()
//     // 获取token值
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (!tokenStr) return next('/login')
//     next()
// })

export default router