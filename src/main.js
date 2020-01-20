// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import './icons'
import store from './store'
import moment from 'moment'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(elementUI)
new Vue({
  el: '#app',
  router,
  elementUI,
  store,
  components: { App },
  template: '<App/>'
})
//全局过滤器
Vue.filter('dateFmt', (dataStr, formatString = "YYYY-MM-DD") => {
    //es5函数参数设置默认值
    //const lastFormatString = formatString ||
     // moment(dataStr) 把时间字符串转成时间对象
     // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
    return moment(dataStr).format(formatString)
})
import './permission' // permission control
// 权限指令
import hasPerm from '@/directive/permission/hasPerm'
import perm from '@/directive/permission/perm'
import './utils/directives.js'
// 注册全局的权限判断方法和指令
Vue.prototype.$hasPerm = hasPerm
Vue.directive('perm', perm)
