import Vue from 'vue'
import Router from 'vue-router'
import HelloWebgis from '@/components/HelloWebgis'
import Login from '@/components/Login'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWebgis',
      component: HelloWebgis
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout
    }

  ]
})
