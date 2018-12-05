import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import AddMovie from '@/components/AddMovie'
import EditMovie from '@/components/EditMovie'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-movie',
      name: 'AddMovie',
      component: AddMovie,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-movie/:movie_slug',
      name: 'EditMovie',
      component: EditMovie,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})

export default router
