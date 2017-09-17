<template>
    <div id="guess_you_likes">
      <div class="guess_likes">
        <h2 class="guess_likes_title">猜你喜欢</h2>
        <div class="guess_likes_main">
          <div class="mui-content">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in guesslist">
              <router-link :to="{path:'/details',query:{ids:item.goodId}}">
                <img class="mui-media-object" :src="item.goodPicUrl">
                <div class="mui-media-body">{{item.goodName}}</div>
                <p>￥{{item.goodMinPrice|substr}}</p>
              </router-link>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script type='es6'>
     export default {
       props:['guesslist'],
     data(){
         return {
         }
     },
       mounted(){
       },
       methods:{
       }
   }

</script>
<style lang='less'>
#guess_you_likes{
/*猜你喜欢部分开始*/
.guess_likes{
.guess_likes_title{
  font-size: 0.3rem;
  line-height: 0.9rem;
  font-weight: 500;
}
.guess_likes_main{
ul{
  background-color: #efeff4;
li{
  padding: 0.15rem;
a{
  margin: 0;
  padding: 0;
  background-color: #ffffff;
}
div{
  height: inherit;
  line-height: normal;
  font-size: 0.3rem;
}
p{
  color: red;
  font-size: 0.2rem;
}
}
}
}
}
}
</style>
