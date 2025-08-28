import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Main from '../views/Main.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { authenticationService } from '@/services/authenticationService'
import Login from '@/views/Login.vue'
import TransactionView from '@/views/TransactionView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/about',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/main',
    component: Main,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login,
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const userAuthenticationService = authenticationService()

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const userConnected: boolean = await (
      await userAuthenticationService.checkIfUserIsConnected()
    ).json()

    if (!userConnected) {
      return next('/login')
    }
  }

  return next()
})

export default router
