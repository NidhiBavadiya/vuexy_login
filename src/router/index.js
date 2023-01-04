import { Token } from 'prismjs'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashBoard.vue'),
      meta: {
        pageTitle: 'DashBoard',
        breadcrumb: [
          {
            text: 'DashBoard',
            active: true,
          },
        ],
      },
    },
    {
      path: '/meals',
      name: 'Meals',
      component: () => import('@/views/Meals.vue'),
      meta: {
        pageTitle: 'Meals',
        breadcrumb: [
          {
            text: 'Meals',
            active: true,
          },
        ],
      },
    },
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },

    //
// {
//   path: '/edit/:id',
//   name: 'EditForm',
//   component: () => import('../components/EditForm.vue'),
// },
// {
//   path: '/add',
//   name: 'EditForm',
//   component: () => import('../components/AddForm.vue'),
// },

    // ------
  ],
})

// ---------------------------------------------------------------------------

// Check login user then allow to access a page
 const checkToken = () => {
   if (localStorage.getItem('token')) {
       return true;
   } else {
       return false;
   }
 }
 router.beforeEach((to, from, next) => {
   if (to.name  !== 'login') {
     if (checkToken()) {
      next()
     }
    else {
      next({name: 'login'}) 
    }
   }
   next()
 })

// -------------------------------------------------------------------------------

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
