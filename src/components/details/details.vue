<template>
  <div id="details">
    <!-- 头部返回部分-->
    <top_back></top_back>
    <!-- 轮播图部分开始-->
    <div class="details_banner">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item,index) in list">
          <img class="preview-img"  :src="item.src" @click="$preview.open(index,list)"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 轮播图部分结束-->

    <!-- 商品信息展示部分开始-->
    <div class="details_main">
      <h2 class="details_main_title">
        <p><strong>￥{{nowprice | substr}}</strong> <span>{{goodTag}}</span></p>
        <p>{{goodName}}</p>
      </h2>
      <div>促销：<span>{{promotion?promotion:"无"}}</span></div>
      <div>选择款式 <span> > </span></div>
    </div>
    <!-- 商品信息展示部分结束-->
    <!-- 评论组件模块-->
    <div id="comment" v-if="commentIsShow">
      <div class="comment_title">
        <strong>评论：<span>(12)</span></strong>
        <span>查看全部&nbsp;></span>
      </div>
      <div class="comment_main">
        <h2 class="">
          <strong><img :src="userAvatar"  alt=""/></strong>
          <span>{{userName}}</span>
          <span>2017.9.3&nbsp; &nbsp; 11:11</span>
        </h2>
        <div class="comment_main_texts">
          <p>{{commentText}}</p>
          <ul class="clearfix" v-if="isShow">
            <li><img :src="skuPic1" alt=""/></li>
          </ul>
          <div>
            <p>类别：<span>全新现货</span></p>
          </div>
        </div>
      </div>
    </div>
<!--上拉加载更多信息开始-->
    <div class="details_more">
       <h4>上拉加载更多</h4>
      <!-- 挖个坑填充加载的页面-->
      <div class="details_more_main">
        <iframe :src="iframesrc"
                      frameborder="0"
                      style="width: 100%"
                      ref="iframe"
                      @load="loadifame"
                      scrolling="no"
                       >

        </iframe>
      </div>
    </div>
    <!--上拉加载更多信息结束-->

    <!-- 加入购物袋开始-->
    <div class="details_shopCar">

    </div>
  </div>
</template>
<script type='es6'>
  import Api from '../commom/API.js'
  import top_back from '../commom/top_back.vue'
  export default {
    data(){
      return {
        ids: this.$route.query.ids,
        list:[],
        lists:[],
        nowprice:"",
        goodName:"",
        promotion:"",
        goodTag:"",
        userName:"",
        createTime:0,
        commentText:"",
        userAvatar:"",
        skuPic1:"",
        isShow:false,
        iframesrc:'',
        iframeheight:200,
        commentIsShow:false
      }
    },
    components:{
      top_back,
    },
    created(){
      this.findGoodDetail()
    },
    methods: {
      findGoodDetail(){
        var that = this
        var url = Api.Apis + '/h5/h5good/findGoodDetail'
        this.$http.post(url,
                               {goodid: this.ids, sortText: "asc"},
                               {emulateJSON: true}
        ).then(function (data) {
          //console.log(data.body);
           var datas = data.body.data
          if(data.status==200 && data.statusText=="OK"){
            this.nowprice = datas.goodDetailBean.skuList[0].nowPrice;
            this.goodName = datas.goodDetailBean.goodName
            this.promotion=datas.orderSale;
            this.goodTag = datas.goodDetailBean.goodTag;
            datas.goodDetailBean.picList.forEach(function(item){
              var obj={}
                    obj.src=item;
                    that.lists.push(obj)
            });
            this.lists.forEach(function(value){
              //console.log(value);
              var img = document.createElement("img");
              img.src=value.src;
              value.w = img.width;
              value.h = img.height;
            })
            this.list=this.lists
          //  获取评论信息；
            if(datas.singleComment){
              this.userName=datas.singleComment.userName
              this.createTime=datas.singleComment.createTime
              this.commentText=datas.singleComment.commentText
              this.userAvatar=datas.singleComment.userAvatar
              if(datas.singleComment.skuPic1!==null){
                this.skuPic1=datas.singleComment.skuPic1
                this.isShow=true
               }
              this.commentIsShow=true
            }
            if(datas.goodDetailBean.goodDescUrl){
              this.iframesrc=datas.goodDetailBean.goodDescUrl
            }

          }
        },function(error){

          })
      },
      loadifame(){
     //console.log(this.$refs.iframe.contentWindow.document.getElementsByTagName('html')[0].clientHeight);
        var thats = this,
              psHeightsAll=0,
              ifameDoc = thats.$refs.iframe.contentWindow.document
        this.iframeheight=ifameDoc.getElementsByTagName('html')[0].clientHeight
        ifameDoc.getElementsByTagName('body')[0].style.margin=0+"px"
        //console.log(this.iframeheight)
        //获取body子元素高度最好
        var ps = ifameDoc.getElementsByTagName('p');
        for(var i=0;i<ps.length;i++){
          psHeightsAll+=ps[i].clientHeight
        }
        this.$refs.iframe.height=psHeightsAll
        window.document.body.onresize = function(){
          //console.log(ifameDoc.getElementsByTagName('html')[0].clientHeight)
          thats.$refs.iframe.height=ifameDoc.getElementsByTagName('html')[0].clientHeight
        }
      }
    }
  }

</script>
<style lang='less' scoped>
  #details{
    margin-bottom: 50px;
  }
.details_banner{
  margin-top: 0.75rem;
  height: 6.30rem;
  width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
      .mint-swipe-items-wrap {
       div{

       }
      }
}
.details_main{
  background-color: #ffffff;
  padding: 0 0.32rem;
  text-align: left;
.details_main_title{
  padding: 0.37rem 0;
  border-bottom: 1px solid #E5E5E5;
  margin: 0;
p{
  margin: 0;
}
p:nth-of-type(1){
  line-height: 1.07rem;
  strong{
    color: #E54560;
    font-size: 0.36rem;
    vertical-align: middle;
  }
  span{
display: inline-block;
    line-height: 0.36rem;
    padding: 5px 10px;
    margin-left: 15px;
    border-radius: 5px;
    font-size: 0.20rem;
    text-align: center;
    background-color: #4595E5;
    color: #ffffff;
  }
}
p:nth-of-type(2){
  font-size: 0.32rem;
  line-height: 0.4rem;
  }
}
div{
  line-height: 1.0rem;
  border-bottom: 1px solid #E5E5E5;
  font-size: 0.26rem;
}
div:nth-of-type(1){
  span{
    color: #0062cc;
  }
}
div:nth-of-type(2){
  span{
    float: right;
    font-family: monospace;
    font-size: 0.27rem;
    font-weight: 600;
  }
}
}
  #comment{
    padding: 0 0.32rem;
    margin-top: 0.2rem;
    background-color: #ffffff;
  .comment_title{
    line-height: 0.89rem;
    text-align: left;
    font-size: 0.25rem;
    border-bottom: 1px solid #E5E5E5;
  strong{
  };
  &>span{
      font-family: monospace;
      font-weight: 600;
      float: right;
      color: #666666;
    }
  };
  .comment_main{
  h2{
    text-align: left;
    line-height: 1.11rem;
  strong{
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
  }
  };
  span{
    font-size: 0.26rem;
  }
  span:nth-of-type(1){
    padding-left: 0.2rem;
  }span:nth-of-type(2){
     font-size: 0.2rem;
     color: #999999;
     float: right;
     line-height: 1.11rem;
   }

  };
  .comment_main_texts{
  p{
    text-align: left;
    line-height: 0.42rem;
    font-size: 0.27rem;
  };
  ul{
  li{
    float: left;
    width: 1.5rem;
    height: 1.5rem;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  }
  }
  div{
    p{
      color: #999999;
    }
  }
  }
  }
  }

  .details_more{
  h4{
    line-height: 0.9rem;
    margin-top: 0.18rem;
    color: #999999;
    font-size: 0.2rem;
    background-color: #ffffff;
  }
  }

</style>
