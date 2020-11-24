import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingleView from '../views/SingleView.vue'
import CategoryList from '../views/CategoryList.vue'
import TagList from '../views/TagList.vue'
import Favorites from '../views/Favorites.vue'
import Search from '../views/Search.vue'


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
    path: '/favorites',
    name: 'Omiljeno',
    component: Favorites,
    props: true,
   
  },
  {
    path: '/search',
    name: 'Pretraga',
    component: Search,
    props: true,
   
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
