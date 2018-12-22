// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
// 全局注册的入口，注释后需要‘//’添加空格
new Vue({
  el: '#app',
  router,
  /*  render: h => h(App) */
  components: {App},
  template: '<App/>'
})
