import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
;const routes: Array<RouteRecordRaw> = [
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
    //mappingView
    path: '/mapping/:idStudent',
    name: 'mapping',
    component: () => import(/* webpackChunkName: "mapping" */ '../views/MappingView.vue')
  }
  ,
  {
      //mappingView
      path: '/mapping2',
      name: 'mapping2',
      components: {
        default: () => import('../views/MappingViewVersion2.vue'),
        header: () => import('../components/headers/MainHeader.vue'),
        menu: () => import('../components/headers/SubHeader.vue'),
      },
      meta: {
        layout: "FullLayout",
      }
    }
  ,
  {
      //manageCourseView
      path: '/manageCourse',
      name: 'manageCourse',
      components: {
        default: () => import('../views/ManageCourseView.vue'),
        header: () => import('../components/headers/MainHeader.vue'),
        menu: () => import('../components/headers/SubHeader.vue'),
      },
      meta: {
        layout: "FullLayout",
      }
  },
  {
    //CourseDetail
    path: '/courseDetail/:idCourse',
    name: 'courseDetail',
    components: {
      default: () => import('../views/CouseDetailView.vue'),
      header: () => import('../components/headers/MainHeader.vue'),
      menu: () => import('../components/headers/SubHeader.vue'),
    },
    meta: {
      layout: "FullLayout",
    }
}
  
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
