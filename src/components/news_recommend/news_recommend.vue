<template>
  <!-- 头部返回组件-->
  <!-- 列表部分开始-->
    <div id="news_recommend">
      <top_back></top_back>
      <div class="news_main mui-content">
        <load_more
          :bottom-method="loadBottom"
          ref="loadmore"
          :auto-fill="false"
          :bottom-all-loaded="allLoaded"
          @bottom-status-change="handleTopChange"
          :max-distance="150"
          :bottom-loading-text="bottomtext"
          :bottom-distance="20"
          >
        <ul class="mui-table-view mui-grid-view">
          <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,indenx) in list">
            <router-link :to="{path:'details',query:{ids:item.goodId}}" >
              <img class="mui-media-object" :src=item.goodPicUrl>
              <div class="mui-media-body">{{item.goodName}}</div>
              <p class="news_main_prices">￥{{item.goodMinPrice|substr}}</p>
            </router-link>
          </li>
        </ul>
          <div slot="bottom" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
          </div>
        </load_more >
      </div>
      <!--<button @click="changeindenx">添加数据</button>-->
    </div>
  <!-- 列表部分结束-->
</template>
<script type='es6'>
  import top_back from "../commom/top_back.vue";
  import Api from '../commom/API.js';
  import Vue from 'vue';
  import {Loadmore} from 'mint-ui';
     export default {
     data(){
         return {
           scrollMode:"auto",
           list:[],
           indenx:0,
           isNews:this.$route.query.isNews,
           newList:[],
           allLoaded:'',
           allLoaded:false,
           bottomtext:"加载中请稍后",
           topStatus:'loading'
         }
     },
       components:{
         top_back,
         load_more:Loadmore
       },
       mounted(){
         this.getgoodlist();
       },
       methods:{
         getgoodlist(){
           //新品推荐
           if(this.isNews=='true'){
             var url = Api.Apis+"/h5/h5good/findNewGoodList";
             this.$http.post(url).then(function(data){
               var datas =  data.body
               this.list = datas.data.newGoodBeanList
               this.allLoaded=true;
             })
           //  人气推荐
           }else if(this.isNews==='false'){
             var url = Api.Apis+"/h5/h5good/goodList";
             var thats = this;
             this.$http.post(url,
               {oneLevelTypeId:0,twoLevelTypeId:0,index:thats.indenx,size:10},
               {emulateJSON: true}).then(function(data){
               //console.log(data)
               //判断接受数据是否成功
                 if(data.status===200&&data.statusText==="OK"){
                   var datas = data.body;
                   datas.data.goodBeanList.forEach(function(value){
                     thats.list.push(value)
                   })
                   if(this.indenx===datas.data.maxIndex-1){
                     this.allLoaded=true;
                   }
                 }
             }, function (error) {
                 this.allLoaded=true;
                 this.indenx-1;
               })
           }
         },
         //上拉刷新
         loadBottom(){
           this.$refs.loadmore.onBottomLoaded();
           this.indenx++;
           this.getgoodlist()
         },
         //设置
         handleTopChange(status){
           this.topStatus=status
           console.log(this.topStatus)
         }
       }
   }

</script>
<style lang='less' scoped>
#news_recommend{
.news_main{
margin-top: 0.75rem;
ul{
  margin-top: 20px;
  margin: 0;
  padding: 0;
  background-color: #F0F0F0;
li{
  padding: 15px;
  padding-right: 10px;
  text-align: left;
.news_main_prices{
  font-size: 0.29rem;
  color: red;
}
div{
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.28rem;
}
a{
  background-color: #ffffff;
}
}
}
}

}

</style>
