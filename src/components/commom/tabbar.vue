<template>
    <div id="">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/classify">
          <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
          <span class="mui-tab-label">消息</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopingCar">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">通讯录</span>
        </router-link>
        <router-link class="mui-tab-item" to="/My">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">设置</span>
        </router-link>
      </nav>
    </div>
</template>
<script type='es6'>
     export default {
     data(){
         return {
         }
     }
   }

</script>
<style lang='less' scoped>

</style>
