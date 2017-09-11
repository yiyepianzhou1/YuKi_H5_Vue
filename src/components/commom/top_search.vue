<template>
    <div id="top_search">
      <header class="header clearfix" ref="header">
        <div class="header_main clearfix">
          <div class="fontsimg">
            <div class="fontsimg_Coupons"></div>
            <span>优惠券</span>
          </div>
          <div class="search">
          <span class="mui-icon mui-icon-search"></span>
          <input type="text" class="to_search" placeholder="日本进口面膜">
        </div>
        </div>
      </header>
    </div>
</template>
<script type='es6'>
  export default {
    data(){
      return {
        resurts: 1
      }
    },
    mounted(){
      var that = this,
        apps = document.querySelector('#apps');
      apps.style.marginTop = that.$refs.header.offsetHeight + 'px'
      if (that.$refs.header.offsetHeight !== undefined) {
        window.document.body.onresize = function () {
          if (that.$refs.header) {
            apps.style.marginTop = that.$refs.header.offsetHeight + 'px'
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  #top_search{
  .header {
    padding: 0 0.32rem;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background: #ffffff;
  .header_main{
    width:100%;
  .fontsimg{
    float:left;
  span{
    margin: 0.08rem 0;
    font-size: 0.2rem;
  }
  .fontsimg_Coupons{
    text-align: center;
    width: 0.48rem;
    height: 0.48rem;
    background: url(../../../static/img/home_icon_ticket@3x.png);
    background-size: 100%;
  }
  }
  .search{
    padding-left: 0.3rem;
    position: relative;
    overflow: hidden;
    margin: 0 0.4rem;
    width: 5.11rem;
    height: 0.64rem;
    border: 0.01rem solid #d4d4d4;
    border-radius: 0.32rem;
    margin: 5px 0;
    float:right;
    background: #EBEBEB;
  .mui-icon{
    position: absolute;
    font-size: 0.3rem;
    left: 0;
    top: 25%;
    display: inline-flex;
    margin-left: 0.16rem;
    width: 0.32rem;
    height: 0.32rem;
    background-size: 100%;
  }
  input{
    padding: 0;
    padding-left: 20px;
    background: #EBEBEB;
    font-size: 0.28rem;
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
  }
  }
  }

  }
  }
</style>
