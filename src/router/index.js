import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/MyHome'
import MenuTree from '@/components/MenuTree'
import list from '@/components/list'
import Permission from '@/components/Permission'
import UserList from '@/components/UserList'
import RoleList from '@/components/RoleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/menus',
      name: 'MenuTree',
      component: MenuTree
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
    },
    {
      path: '/roles',
      name: 'roles',
      component: RoleList
    }
  ]
})
