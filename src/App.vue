<template>
  <div id="app">
    <router-view></router-view>

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

<script type="es6">
export default {
  name: 'app',
  components: {},
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
#app  {
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
background: url(../static/img/home_icon_ticket@3x.png);
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
    padding-left: 0px;
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
