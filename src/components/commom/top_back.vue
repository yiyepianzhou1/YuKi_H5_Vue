<template>
    <div id="apps">
      <div class="top_back clearfix">
        <header id="header" class="mui-bar mui-bar-nav">
          <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
        </header>
      </div>
    </div>
</template>
<script type='es6'>
     export default {
     data(){
         return {
         }
     },
       methods:{
         goback(){
           this.$router.go(-1)
         }
       }
   }

</script>
<style lang='less' scoped>
  #apps{
    margin: 0;
  }

.top_back{
  .mui-bar-nav,.mui-bar{
    box-shadow: none;
    background-color: #ffffff;
  }
  .mui-bar{
    height: 0.75rem;
  }
  #header{
    a{
      padding: 0;
      line-height: 0.75rem;
    }
  }
}
</style>
