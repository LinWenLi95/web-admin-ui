import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Permission from '@/components/Permission'
import list from '@/components/list'
import MyForm from '@/components/MyForm'
import MyTree from '@/components/MyTree'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyTree',
      component: MyTree
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
