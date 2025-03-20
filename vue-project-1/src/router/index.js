import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddNoteView from '@/views/AddNoteView.vue'
import EditView from '@/views/EditView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component : HomeView
    },
    {
      path : "/notes/add",
      name : "Add-Note",
      component : AddNoteView
    },
    {
      path : "/notes/edit/:id",
      name : "Edit-Note",
      component : EditView
    },
    {
      path: '/about',
      name: 'about',
    },
    {
      path : "/:catchAll(.*)",
      name  :"not-found",
      component : NotFoundView
    }
  ],
})

export default router
