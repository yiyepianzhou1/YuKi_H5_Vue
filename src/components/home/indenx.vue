<template>
  <div id="apps">
    <topsearch></topsearch>
    <!-- 轮播图部分开始-->
    <div class="banner_lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in list">
          <!-- 跳转至详情页-->
          <router-link :to="{path:'/details',query:{ids:item.targetId}}"><img :src=item.picUrl alt="item.title"/></router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 轮播图部分结束-->

    <!-- 新品推荐部分开始-->
    <div class="news_recommend">
      <!-- 跳转至新品推荐-->
      <router-link :to="{path:'new_recommend',query:{isNews:'true'}}"><h2 class="recommend">新品推荐 <span class="news_recommend_icon"></span></h2>
      </router-link>
      <div class="imgshare_top" @load="loaded">
        <div id="wrapper" class="clearfix">
          <div id="scroller">
            <ul class="clearfix" id="scroller_main">
              <li class="active lisAll" v-for="(item,indenx) in listnews">
                <!-- 跳转至商品详情页-->
                <router-link :to="{path:'/details',query:{ids:item.goodId}}">
                  <img :src="item.goodPicUrl" alt=""/>
                  <span>{{item.goodName}}</span>
                  <p>￥{{item.goodMinPrice | substr}}</p>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 新品推荐部分j结束-->

    <!--人气推荐部分开始-->
    <div class="people_recommend">
      <router-link :to="{path:'new_recommend',query:{isNews:'false'}}" class="clearfix"><h2 class="recommend">人气推荐 <span class="news_recommend_icon"></span></h2>
      </router-link>
      <div class="people_recommend_main">
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media" v-for="item in recommend_list">
          <!-- 跳转至商品详情页-->
          <router-link :to="{path:'/details',query:{ids:item.goodId}}" class="mui-navigate-right">
            <img class="mui-media-object mui-pull-left" :src="item.goodPicUrl">
            <div class="mui-media-body">
              {{item.goodName}}
              <p class='mui-ellipsis'>￥{{item.goodMinPrice|substr}}</p>
            </div>
          </router-link>
        </li>
      </ul>
      </div>
    </div>
    <!-- 人气推荐部分结束-->

  <!-- 猜你喜欢部分开始-->
    <guess_likes :guesslist='guess_list'></guess_likes>

  <!-- 猜你喜欢部分结束-->
  </div>
</template>
<script type='es6'>
  import IScroll from '../../../static/scroll/iscroll.js'
  import '../../../static/scroll/iscroll.css'
  import Api from '../../components/commom/API.js'
  import  topsearch from '../commom/top_search.vue'
  import guessLikes from '../commom/guess_you_like.vue'
  //Vue.component(Swipe.name, Swipe);
  //Vue.component(SwipeItem.name, SwipeItem);
  export default {
    data(){
      return {
        list: [],
        listnews: [],
        recommend_list:[],
        guess_list:[],
        //guesslikes:1
      }
    },
    components: { topsearch,guess_likes:guessLikes },
    mounted(){
      this.loaded();
      this.getsbanner();
    },
    methods: {
      getsbanner(){
        var url = Api.Apis + '/h5/h5index/indexPage'
        this.$http.post(url).then(function (data) {
          if (data.status == 200 && data.ok == true) {
            var datas = data.body
            this.list = datas.data.banners
            this.listnews = datas.data.newGoodBeanList
            this.recommend_list=datas.data.popularGoodBeanList
            this.guess_list=datas.data.guessGoodList
          }
        })
      },
      //滚动条部分
      loaded: function () {
        var myScroll = new IScroll('#wrapper', {
          eventPassthrough: true,
          scrollX: true,
          scrollY: false,
          preventDefault: false
        });
      },
    }
  }
</script>
<style scoped lang="less">
  #apps {
  /*轮播图部分开始*/
  .banner_lunbo {
    height: 4.2rem;

  a {
    display: block;

  img {
    display: block;
    vertical-align: bottom;
    width: 100%;
    height: 100%;
  }

  }
  }
  /*轮播图部分结束*/

  /*推荐公共标题部分*/
  .recommend {
    margin: 0;
    font-size: 0.32rem;
    border-bottom: 1px solid #E6E6E6;
    line-height: 0.94rem;
  }

  .news_recommend_icon {
    float: right;
    margin: 0.25rem;
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    background: url(../../../static/img/home_icon_next_circle@3x.png);
    background-size: cover;
    vertical-align: middle;
  }

/*新品推荐部分开始*/
  .news_recommend {
    background-color: #ffffff;
    padding: 0 0.3rem;
    font-weight: 600;

  a {
    display: block;
  }

  .imgshare_top {
    height: 4.53rem;

  #wrapper {
    height: 100%;
  }

  #scroller {
    width: 28.38rem;

  li {
    line-height: initial;
    margin: 0 5px;
    padding: 0 10px;
    height: 100%;
    width: 2.58rem;

  img {
    display: block;
    width: 100%;
  }

  span {
    display: block;
    max-width: 2.6rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.2rem 0.16rem;
    font-size: 0.28rem;
    color: #333333;
  }

  p {
    font-size: 0.22rem;
    color: red;
    font-weight: 200;
  }

  }
  }
  }
  }
  /*人气推荐部分*/
  .people_recommend{
    margin-top: 0.18rem;
    padding: 0 0.3rem;
    background-color: #ffffff;
  .mui-table-view:before{
     height: 0;
  }
  ul{
    li{
    padding-top: 0.45rem;
  a{
    display: block;
  img{
    display: block;
    width: 2.0rem;
    max-width: none;
    height: inherit;
  }
  .mui-media-body{
    text-overflow: ellipsis;
    text-align: left;
    font-size: 0.3rem;
  p{
    margin-top: 0.7rem;
    color: red;
    font-size: 0.24rem;
  }
  }
  &::after{
     font-size: 0.34rem
   ;
   }

  }
    }
  }
  }
  /*人气推荐部分结束*/
  }
</style>
