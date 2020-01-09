import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/MyHome'
import MenuSettings from '@/components/MyTree'
import list from '@/components/list'
import Permission from '@/components/Permission'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/menuSettings',
      name: 'MenuSettings',
      component: MenuSettings
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/Permission',
      name: 'Permission',
      component: Permission
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList
    }
  ]
})
