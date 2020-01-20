import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import commodity from '@/components/commodity'
import addFruit from '@/components/addFruit'
import updateFruit from '@/components/updateFruit'
import selectFruit from '@/components/selectFruit'
import orderForm from '@/components/orderForm'
import afterSale from '@/components/afterSale'
import bill from '@/components/bill'
Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  component: login,
  hidden: false
}]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
        path: '/commodity',
        name: 'commodity',
        component: commodity,
      },
      {
        // hidden: true,
        path: '/addFruit',
        name: 'addFruit',
        component: addFruit,
      },
      {
        // hidden: true,
        path: '/updateFruit',
        name: 'updateFruit',
        component: updateFruit
      },
      {
        // hidden: true,
        path: '/selectFruit',
        name: 'selectFruit',
        component: selectFruit
      },
      {
        path: '/orderForm',
        name: 'orderForm',
        component: orderForm
      },
      {
        path: '/afterSale',
        name: 'afterSale',
        component: afterSale,
      },
      {
        path: '/bill',
        name: 'bill',
        component: bill
      },
    ]
  },
]
