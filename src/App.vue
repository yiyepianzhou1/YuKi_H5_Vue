<template>
  <div id="app">
    <router-view></router-view>
    <tabbar v-if="isShow"></tabbar>
  </div>
</template>

<script type="es6">
  import tabbar from './components/commom/tabbar.vue'
export default {
  name: 'app',
  data(){
  return {
    isShow:true
    }
  },
  components: { tabbar },
    //添加监听路由路径、
    watch:{
      $route(){
        console.log(this.$route.path)
        if(this.$route.path==="/new_recommend"){
          this.isShow=false
        }else{
          this.isShow=true
        }
      }
  },
  methods:{
  }
}
</script>
<style scoped lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
