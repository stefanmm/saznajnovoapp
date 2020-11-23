import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingleView from '../views/SingleView.vue'
import CategoryList from '../views/CategoryList.vue'
import TagList from '../views/TagList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/single/:postid',
    name: 'Članak',
    component: SingleView

  },
  {
    path: '/category/:catid',
    name: 'Kategorija',
    component: CategoryList,
    props: true,
    
  },
  {
    path: '/tag/:tagid',
    name: 'Tag',
    component: TagList,
    props: true,
    
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
