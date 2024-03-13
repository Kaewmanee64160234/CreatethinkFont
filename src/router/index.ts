import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthCallback from '../views/AuthCallback.vue';
import { useAuthStore } from '@/stores/auth';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/auth/callback', // This should match the callback URL path
    name: 'AuthCallback',
    component: AuthCallback,
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user && to.name !== 'Login') {
    next({ name: 'Login' });
  } else {
    next();
  }
});
export default router
