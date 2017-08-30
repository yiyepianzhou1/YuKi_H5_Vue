// 模块依赖部分引入
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import MintUi from 'mint-ui'
Vue.use(MintUi)
Vue.use(vueRouter)

// 组件部分的引入


// 实例化路由
var router = new vueRouter({
  mode:'history',
  base:__dirname
})
// Vue.config.productionTip = false
// 样式导入
import '../static/mui/css/mui.css'
import '../static/css/base.css'

// 实例化vue
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
