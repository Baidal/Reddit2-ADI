import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Community from '../views/Community.vue'
import Error from '../views/Error.vue'
import NewCommunity from '../views/NewCommunity.vue'
import NewPost from '../views/NewPost.vue'
import Post from '../views/Post.vue'
import Perfil from '../views/Perfil.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register
  },
  {
    path: '/r/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/r/:comName',
    name: 'community',
    component: Community
  },
  {
    path: '/error/:error',
    name: 'error',
    component: Error
  },
  {
    path: '/r/new',
    name: 'newCommunity',
    component: NewCommunity
  },
  {
    path: '/r/:comName/post/new',
    name: 'newPost',
    component: NewPost
  },
  {
    path: '/r/user/:name',
    name: 'perfil',
    component: Perfil
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
