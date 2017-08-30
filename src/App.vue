<template>
  <div id="app">
  	<header class="header">
        <div class="header_main">
            <div class="fontsimg">
               <span></span>
            </div>
            <div class="search">
                <input type="text" class="to_search" placeholder="日本进口面膜">
            </div>
        </div>
		</header>
    <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>
    <hello></hello>
  </div>
</template>

<script type="es6">
import Hello from './components/home/indenx.vue'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .header {
    display: flex;
    background:#fff
}
#app .header .header_main {
    width:100%;
}
#app .header .header_main .fontsimg{
    float:left;
}
#app .header .header_main .search {
    float:right;
}
#app .headers .serchs{
    float:right;
    overflow: hidden;
    margin: 0 0.4rem;
    width: 5.11rem;
    height: 0.64rem;
    border: 0.01rem solid #d4d4d4;
    border-radius: 0.32rem;
}
#app .headers .to-search {
  color: #999999;
  background: #EBEBEB;
  font-size: 0.28rem;
  border:0;
  color: #333333;
}
</style>
