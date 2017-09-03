// 模块依赖部分引入
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import MintUi from 'mint-ui'
import resource from 'vue-resource'
Vue.use(MintUi)
Vue.use(vueRouter)
Vue.use(resource)

// 组件部分的引入
import home from './components/home/indenx.vue'
import classify from './components/classify/classify.vue'
import shopingCar from './components/shoppingCar/shopingCar.vue'
import My from './components/My/My.vue'
import news_recommend from './components/news_recommend/news_recommend.vue'
import details from './components/details/details.vue'

// 实例化路由
var router = new vueRouter({
  mode:'history',
  base:__dirname,
  routes:[
    {path:'/home',component:home},
    {path:'/classify',component:classify},
    {path:'/shopingCar',component:shopingCar},
    {path:'/My',component:My},
    {path:'/new_recommend',component:news_recommend},
    {path:'/details',component:details},
    {path:'/',redirect:'/home'},
    //{path:'',component:}
  ]
})
// Vue.config.productionTip = false
// 样式导入
import '../static/mui/css/mui.css'
import '../static/css/base.css'
import  'mint-ui/lib/style.css'

//自定义一个过滤器截取字符串
Vue.filter('substr',function(val){
  var str = val.toString(),
        newstr =  str.substring(0,str.length-2)
  return newstr
})
// 实例化vue
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
