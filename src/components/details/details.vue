<template>
  <div id="details">
    <!-- 头部返回部分-->
    <top_back></top_back>
    <!-- 轮播图部分开始-->
    <div class="details_banner">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item,index) in list">
          <img class="preview-img" :src="item.src" @click="$preview.open(index,list)"/>
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
      <div @click="gobuys">选择款式 <span> > </span></div>
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
          <strong><img :src="userAvatar" alt=""/></strong>
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
    <!-- 点击选择款式开始-->
    <div class="details_gobuys" v-if="gobuysIsShow">
      <div class="details_gobuys_main">
        <div class="details_gobuys_imgs">
          <img :src="classimgs" alt=""/>
          <div>
            <p>价格：{{prices|substr}}</p>
            <p>{{classifys}}</p>
          </div>
          <span @click="closegobuys">X</span>
        </div>
        <!-- 类型-->
        <div class="details_gobuys_class1" v-for="(items,indenx) in propertyList_0">
        <p>{{items.propertyName}}</p>
        <p ref="gobuy_classify">
          <button v-for="(item,index) in items.valueList" @click="change_classify0(items.propertyid,item.valueid,$event)">{{item.valueName}}</button>
        </p>
      </div>
        <div class="details_gobuys_class1" v-for="(items,indenx) in propertyList_1">
          <p>{{items.propertyName}}</p>
          <p>
          <button v-for="(item,index) in items.valueList" @click="change_classify1(items.propertyid,item.valueid,$event)">{{item.valueName}}</button>
        </p>
        </div>
        <div class="details_gobuys_counts">
          <p>数量</p>
          <button @click="deletes">-</button>
          <span>{{counts}}</span>
          <button @click="adds">+</button>
          <em>库存：({{stockNum}})</em>
        </div>
      </div>
    </div>

    <!-- 点击选择款式结束-->
    <!--上拉加载更多信息开始-->
    <div class="details_more">
      <h4>点击加载更多</h4>
      <!-- 挖个坑填充加载的页面-->
      <div class="details_more_main">
        <iframe :src="iframesrc"
                frameborder="0"
                style="width: 100%"
                ref="iframe"
                @load="loadifame"
                scrolling="no"
                v-if="iframeIsShow"
          >
        </iframe>
      </div>
    </div>
    <!--上拉加载更多信息结束-->
    <!-- 加入购物袋开始-->
    <div class="details_shopCar clearfix" :class="{'shopcar_isShow':details_shopCar}">
        <div><span class="service"></span></div>
        <div><router-link to="/shopingCar"><span class="gobuys"></span></router-link></div>
        <div @click="promptly_gobuys"><router-link to=""><span class="promptly_gobuys">立即购买</span></router-link></div>
        <div @click="add_gobuys"><span class="add_gobuys">加入购物车</span></div>
    </div>
  </div>
</template>
<script type='es6'>
  import Api from '../commom/API.js';
  import top_back from '../commom/top_back.vue';
  import { Toast } from 'mint-ui';
  export default {
    data(){
      return {
        ids: this.$route.query.ids,
        list: [],
        lists: [],
        nowprice: "",
        goodName: "",
        promotion: "",
        goodTag: "",
        userName: "",
        createTime: 0,
        commentText: "",
        userAvatar: "",
        skuPic1: "",
        isShow: false,
        iframesrc: '',
        iframeheight: 200,
        commentIsShow: false,
        iframeIsShow:false,
        gobuysIsShow:false,
        details_shopCar:false,
        propertyList_0:[],
        propertyList_1:[],
        classimgs:"",
        classifys:"",
        prices:0,
        counts:0,
        newsSkuList:[],
        skuidText:"",
        skuidText_01:"",
        skuidText_02:"",
        stockNum:"",
        skuid:0
      }
    },
    components: {
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
            var datas = data.body.data
            //获取数据
            if (data.status == 200 && data.statusText == "OK") {
              this.nowprice = datas.goodDetailBean.skuList[0].nowPrice;
              this.goodName = datas.goodDetailBean.goodName
              this.promotion = datas.orderSale;
              this.goodTag = datas.goodDetailBean.goodTag;
              this.classimgs = datas.goodDetailBean.skuList[0].skuPic
              //提取第一个类型
              this.propertyList_0.push(datas.goodDetailBean.propertyList[0])
              //console.log(datas.goodDetailBean.propertyList[1])
              //提取第二个类型做判断
              if(datas.goodDetailBean.propertyList[1]!==undefined){
                this.propertyList_1.push(datas.goodDetailBean.propertyList[1])
              }
              this.classifys = datas.goodDetailBean.skuList[0].skuDesc
              this.prices = datas.goodDetailBean.skuList[0].nowPrice
              var thats = this
              //将获取的商品详情重新提取，
              datas.goodDetailBean.skuList.forEach(function(value){
                thats.newsSkuList[value.skuidText]=value
              })
              console.log(this.newsSkuList)
              //使用vue-preview插件，将数据重新提取赋值
              datas.goodDetailBean.picList.forEach(function (item) {
                var obj = {}
                obj.src = item;
                that.lists.push(obj)
              });
              this.lists.forEach(function (value) {
                var img = document.createElement("img");
                img.src = value.src;
                value.w = img.width;
                value.h = img.height;
              })
              this.list = this.lists
              //  提取取评论信息；
              if (datas.singleComment) {
                this.userName = datas.singleComment.userName
                this.createTime = datas.singleComment.createTime
                this.commentText = datas.singleComment.commentText
                this.userAvatar = datas.singleComment.userAvatar
                //评论消息有则渲染没有则   不渲染
                if (datas.singleComment.skuPic1 !== null) {
                  this.skuPic1 = datas.singleComment.skuPic1
                  this.isShow = true
                }
                this.commentIsShow = true
              }
              //获取数据中的页面
              if (datas.goodDetailBean.goodDescUrl) {
                this.iframesrc = datas.goodDetailBean.goodDescUrl
              }
            }
          }, function (error) {
            //alert("数据请求失败")
            Toast({
              message: '数据加载失败......',
              position: 'middle',
              duration: 6000
            });
          })
      },
      //获取iframe使根据内容自适应高度，
      loadifame(){
        //由于浏览器不支持跨域，所以无法正常获取到子元素的高度，等待上线时使用该方法
        //document.domain="m.yukicomic.com"
        var thats = this,
          psHeightsAll = 0,
          ifameDoc = thats.$refs.iframe.contentWindow.document;
        this.iframeheight = ifameDoc.getElementsByTagName('html')[0].clientHeight;
        ifameDoc.getElementsByTagName('body')[0].style.margin = 0 + "px"
        //console.log(this.iframeheight)
        //获取body子元素高度最好
        var ps = ifameDoc.getElementsByTagName('p');
        for (var i = 0; i < ps.length; i++) {
          psHeightsAll += ps[i].clientHeight
        }
        this.$refs.iframe.height = psHeightsAll
        window.document.body.onresize = function (){
          thats.$refs.iframe.height = ifameDoc.getElementsByTagName('html')[0].clientHeight
        }
      },
      //类型一事件
      change_classify0(ids1,ids,e){
        this.skuidText_01=ids1+":"+ids+"/"
        this.skuidText=this.skuidText_01.toString()+(this.skuidText_02.toString()?this.skuidText_02:"")
        var btns=e.path[1].children
        for(var i=0;i<btns.length;i++){
          btns[i].style.backgroundColor="#fff"
        }
        e.target.style.backgroundColor="red"
        if(this.newsSkuList.indexOf(this.skuidText)&&this.newsSkuList[this.skuidText]!==undefined){
          console.log(this.skuidText)
          console.log(this.newsSkuList[this.skuidText])
          this.prices=this.newsSkuList[this.skuidText].nowPrice
          this.classifys = this.newsSkuList[this.skuidText].skuDesc
          this.classimgs =this.newsSkuList[this.skuidText].skuPic
          this.stockNum = this.newsSkuList[this.skuidText].stockNum
          this.skuid = this.newsSkuList[this.skuidText].skuid
        }
      //  提取库存信息
      },
      //类型二事件
      change_classify1(ids1,ids,e){
        this.skuidText_02=ids1+":"+ids+"/"
        this.skuidText=this.skuidText_01+this.skuidText_02
        var btns=e.path[1].children
        for(var i=0;i<btns.length;i++){
          btns[i].style.backgroundColor="#fff"
        }
        e.target.style.backgroundColor="red"
        if(this.newsSkuList.indexOf(0,this.skuidText)&&this.newsSkuList[this.skuidText]!==undefined){
          console.log(this.skuidText)
          console.log(this.newsSkuList[this.skuidText])
          this.prices=this.newsSkuList[this.skuidText].nowPrice
          this.classifys = this.newsSkuList[this.skuidText].skuDesc
          this.classimgs =this.newsSkuList[this.skuidText].skuPic
          this.stockNum = this.newsSkuList[this.skuidText].stockNum
          this.skuid = this.newsSkuList[this.skuidText].skuid
        }
      },
      //加
      adds(){
         this.counts++;
        //大于改商品库存是提醒并等于最大库存数
        if(this.counts>=this.stockNum){
          this.counts=this.stockNum
          Toast({
            message: '亲，库存不够了了哦^_^',
            position: 'middle',
            duration: 5000
          });
        }

      },
      //减
      deletes(){
        this.counts--
        if(this.counts<=0){
          this.counts=0
        }
      },
      //加入购物车
      add_gobuys(){
        //加入购物车需要传入userid，通过缓存区保存并获取
        //
        //提交购物车提前判断下当前传入的参数是否有效
        if(this.counts&&this.skuid){
          var url = Api.Apis+"/h5/h5goodcart/addUserGoodCart",
            //files={skuid:this.skuid,count:this.counts,userid:}
            files={skuid:this.skuid,count:this.counts}
          this.$http.post(url,files,{emulateJSON: true}).then(function(data){
            //提交购物车成功
            if(data.body.data.state==="success"){
              //提示信息
              Toast({
                message: '已添加至购物车',
                iconClass: 'icon icon-success'
              });
            }
          })
        }
      },
      //立即购买,跳转页面将需要的参数传入，
      promptly_gobuys(){

      },
      mounted(){

      },
      //点击选择款式
      gobuys(){
        this.gobuysIsShow=true;
        this.details_shopCar=true
      },
      //关闭按钮
      closegobuys(){
        this.gobuysIsShow=false
        this.details_shopCar=false
      }
    }
  }

</script>
<style lang='less' scoped>
  #details {
    margin-bottom: 50px;
  }

  .details_banner {
    margin-top: 0.75rem;
    height: 6.30rem;
    width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
  }
  .details_main {
    background-color: #ffffff;
    padding: 0 0.32rem;
    text-align: left;

  .details_main_title {
    padding: 0.37rem 0;
    border-bottom: 1px solid #E5E5E5;
    margin: 0;

  p {
    margin: 0;
  }

  p:nth-of-type(1) {
    line-height: 1.07rem;

  strong {
    color: #E54560;
    font-size: 0.36rem;
    vertical-align: middle;
  }

  span {
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
  p:nth-of-type(2) {
    font-size: 0.32rem;
    line-height: 0.4rem;
  }

  }
  div {
    line-height: 1.0rem;
    border-bottom: 1px solid #E5E5E5;
    font-size: 0.26rem;
  }

  div:nth-of-type(1) {

  span {
    color: #0062cc;
  }

  }
  div:nth-of-type(2) {

  span {
    float: right;
    font-family: monospace;
    font-size: 0.27rem;
    font-weight: 600;
  }

  }
  }
  #comment {
    padding: 0 0.32rem;
    margin-top: 0.2rem;
    background-color: #ffffff;

  .comment_title {
    line-height: 0.89rem;
    text-align: left;
    font-size: 0.25rem;
    border-bottom: 1px solid #E5E5E5;

  strong {
  }

  ;
  &
  >
  span {
    font-family: monospace;
    font-weight: 600;
    float: right;
    color: #666666;
  }

  }
  ;
  .comment_main {

  h2 {
    text-align: left;
    line-height: 1.11rem;

  strong {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
  }

  }
  ;
  span {
    font-size: 0.26rem;
  }

  span:nth-of-type(1) {
    padding-left: 0.2rem;
  }

  span:nth-of-type(2) {
    font-size: 0.2rem;
    color: #999999;
    float: right;
    line-height: 1.11rem;
  }

  }
  ;
  .comment_main_texts {

  p {
    text-align: left;
    line-height: 0.42rem;
    font-size: 0.27rem;
  }

  ;
  ul {

  li {
    float: left;
    width: 1.5rem;
    height: 1.5rem;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  }
  }
  div {

  p {
    color: #999999;
  }

  }
  }
  }
  }

  .details_more {

  h4 {
    line-height: 0.9rem;
    margin-top: 0.18rem;
    color: #999999;
    font-size: 0.2rem;
    background-color: #ffffff;
    margin-bottom: 0;
  }

  }
  .details_gobuys {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 100;

  .details_gobuys_main {
    overflow: scroll;
    margin-bottom: 1rem;
    text-align: left;
    padding: 0.33rem;
    padding-bottom: 0;
    position: absolute;
    bottom: 0;
    height: 8.24rem;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;

  .details_gobuys_imgs {

  img {
    width: 1.7rem;
    height: 1.7rem;
  }

  div {
    display: inline-block;
    margin-top: 0.77rem;
    margin-left: 0.3rem;
  p {
    font-size: 0.28rem;
  }
  p:nth-of-type(1) {
    color: red;
  }
  }
  span {
    float: right;
  }

  }
  .details_gobuys_class1{
  p{
    line-height: 0.66rem;
    font-size: 0.22rem;
  }
    button{
      margin-right: 10px;
      margin-bottom: 5px;
    }
  }
  .details_gobuys_counts{
  margin-bottom: 20px;
  p{
    line-height: 0.67rem;
    margin-top: 0.27rem;
  }
    span,button{
      margin-right: -5px;
    }
    span{
      display: inline-block;
      width: 50px;
      line-height: 31px;
      text-align: center;
      border: 1px solid #999999;
    }
    em{
      margin-left: 10px;
      font-style: normal;
    }
  }
  }
  }
  .details_shopCar{
    position: relative;
    width: 100%;
    height: 1rem;
    background-color: #eff0f3;
    div{
      float: left;
    }
    div:nth-of-type(1),div:nth-of-type(2){
      width: 0.95rem;
      height: 100%;
      line-height: 1rem;
      border-right: 1px solid #d9d9d9;
      padding: 0.17rem;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: url(../../../static/img/warehouse/toolbar_icon_kefu@3x.png);
        background-size: cover;
      }
    }div:nth-of-type(2){
    span{
      background: url(../../../static/img/warehouse/toolbar_icon_bag@3x.png);
      background-size: cover;
    }

    }div:nth-of-type(3),div:nth-of-type(4){
    font-size: 0.27rem;
    border-right: 1px solid #d9d9d9;
    height: 100%;
    width: 2.80rem;
    line-height: 1rem;
    }div:nth-of-type(4){
     border: none;
    background-color: #007aff;
    color: #ffffff;
    }
  }
  /*改变点击加入购物车或立即购买那块的样式 */
.shopcar_isShow{
  position: fixed;
  bottom: 0;
  z-index: 101;
}
</style>


