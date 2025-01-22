import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home, 
        },
        {
            path:'/management',
            name:'management',
            component: () => import('../views/Management.vue')
        }
    ],
});

export default router