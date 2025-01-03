import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/TodoView.vue'
import EditView from '@/views/EditView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },{
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/todo',
      name: 'todo-view',
      component: TodoView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/todo/:id/edit',
      name: 'edit-view',
      component: EditView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile-view',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      return next('/login');
    }
    next();
  } else {
    next();
  }
});

export default router
