<template>
  <div id="shopCar">
    <!-- 头部部分开始-->
    <div class="top_back clearfix">
      <header id="header" class="mui-bar mui-bar-nav">
        <h2 class="mui-title">购物袋</h2>
        <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="change_shop">{{btnIsShow?"编辑":"完成"}}
        </button>
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
      </header>
    </div>
    <!-- 头部部分结束-->
    <!--购物车内容部分开始-->
    <div class="shopcar_shops">
      <div class="shopcar_shops_main" v-if="isShow">
        <!-- 没有物品在购物车中时-->
        <div class="shopcar_null">
          <img src="../../../static/img/shopping-bag/bag_icon_cat_empty@3x.png" alt=""/>

          <p>要不去添加点东西吧</p>
        </div>
      </div>
      <div class="shopcar_have" v-else>
        <ul class="shopcar_have_main">
          <li v-for="(item,indenx) in usergoodlist">
            <span @click="isGobuys(item,item.priceNow,$event)" :class="{'bac_blue':item.checked}"></span>
            <router-link to="">
              <img :src=item.goodDetailPicUrl alt=""/>

              <div v-if="changecont_isShow">
                <p>{{item.goodName}}</p>

                <p>款式：<span>{{item.valueText}}</span></p>

                <p>￥{{item.priceNow| substr}}<span> x{{item.count}}</span></p>
              </div>
              <div v-else class="">
                <p></p>

                <p style="text-align: right">款式：<span>{{item.valueText}}</span></p>

                <p class="change_count">￥{{item.priceNow| substr}}
                  <span @click="changecont(item,1)">+</span>
                  <span>{{item.count}}</span>
                  <span @click="changecont(item,-1)">-</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--购物车内容部分结束-->
    <!--猜你喜欢部分开始-->
    <guesslikes :guesslist='guess_list'></guesslikes>
    <!--猜你喜欢部分结束-->
    <!-- 底部结算部分开始-->
    <div class="shopingCar_nav">
      <div class="shopingCar_nav_main">
        <span @click="allChecked"></span>
        <span>全选</span>
        <span>￥{{allPrices|substr}}</span>
        <button type="button" v-if="btnIsShow">
          <!-- 跳转至结算页面-->
          <router-link :to="{path:'/',query:{skuids:skuidss}}" style="color: #ffffff">结算</router-link>
        </button>
        <button type="button" v-else @click="setDelete">删除</button>
      </div>
    </div>
    <!-- 底部结算部分结束-->
  </div>
</template>
<script type='es6'>
  import Api from '../../components/commom/API.js'
  import guesslikes from '../commom/guess_you_like.vue'
  export default {
    data(){
      return {
        guess_list: [],
        useid: 16204,
        isShow: true,
        usergoodlist: [],
        changecont_isShow: true,
        counts: 0,
        flage: true,
        isFlage: true,
        allPrices: 0,
        btnIsShow: true,
        skuids: "",
      }
    },
    components: {guesslikes},
    methods: {
      goback(){
        this.$router.go(-1)
      },
      getsfindcarts(){
        var url = Api.Apis + "/h5/h5goodcart/findUserGoodCart"
        this.$http.post(url,
          {"userid": this.useid},
          {emulateJSON: true}).then(function (data) {
            var datas = data.body.data;
            this.guess_list = datas.guessGoodList;
            this.counts = datas.guessGoodList.count
            if (datas.cartBeanList.length !== 0) {
              this.usergoodlist = datas.cartBeanList
              this.isShow = false
            } else {
              this.isShow = true
            }
          }, function (error) {
            alert("数据请求失败")
          })
      },
      //点击编辑
      change_shop(){
        if (this.changecont_isShow === true) {
          this.changecont_isShow = !this.changecont_isShow
          this.btnIsShow = !this.btnIsShow
        } else if (this.changecont_isShow === false) {
          this.changecont_isShow = !this.changecont_isShow
          this.btnIsShow = !this.btnIsShow
        }
      },
      //点击选中需要添加至结算
      isGobuys(i){
        if (typeof i.checked === 'undefined') {
          this.$set(i, "checked", true)
        } else {
          i.checked = !i.checked
        }
        this.calcTotalPrice()
      },
      //编辑购物车数量加
      changecont(item, conts){
        var thats = this
        if (conts > 0) {
          item.count++
          //判断库存还否足够
          if (item.count > item.skuStock) {
            item.count = item.skuStock
            alert("库存不够了")
          } else {
            var url = Api.Apis + "/h5/h5goodcart/updateUserGoodCart"
            this.$http.post(url,
              {cartid: item.cartid, type: "plus", userid: thats.useid, skuid: item.skuid, count: item.count},
              {emulateJSON: true}
            ).then(function (data) {
              })
          }
        } else {
          item.count--
          if (item.count < 1) {
            item.count = 1
            alert("商品不能低于1")
          } else {
            var url = Api.Apis + "/h5/h5goodcart/updateUserGoodCart";
            this.$http.post(url,
              {cartid: item.cartid, type: "less", userid: thats.useid, skuid: item.skuid, count: item.count},
              {emulateJSON: true}
            ).then(function (data) {
              })
          }
        }
      },
      //  计算金额
      calcTotalPrice(){
        this.allPrices = 0;
        this.usergoodlist.forEach((value, index)=> {
          if (value.checked) {
            this.allPrices += value.priceNow * value.count;
          }
        })
      },
      //  全选与取消
      allChecked(){
        console.log(this.flage)
        this.usergoodlist.forEach((value, index)=> {
          value.checked !== undefined ? value.checked = this.flage : this.$set(value, "checked", true);
        })
        this.flage = !this.flage
        this.calcTotalPrice()
      },
      //  删除
      setDelete(){
        var cartids = [];
        this.usergoodlist.forEach((value)=> {
          if (value.checked) {
            cartids.push(value.cartid);
          }
        })
        var ids = cartids.join(',');
        var url = Api.Apis + "/h5/h5goodcart/delUserGoodCart";
        this.$http.post(url,
          {cartids: ids, userid: this.useid},
          {emulateJSON: true}
        ).then((data)=> {
            this.getsfindcarts()
          })
      },
    },
    computed: {
      skuidss(){
        var ids = [];
        this.usergoodlist.forEach((value)=> {
          if (value.checked) {
            ids.push(value.skuid);
          }
        })
        this.skuids = ids.join(',');
        return this.skuids
      },
    },
    mounted(){
      this.getsfindcarts();
    }
  }

</script>
<style lang='less' scoped>
  #shopCar {
    margin-top: 0.75rem;

  .top_back {

  .mui-bar-nav, .mui-bar {
    box-shadow: none;
    background-color: #ffffff;
  }

  .mui-title {
    line-height: 0.75rem;
    font-size: 0.32rem;

  }

  .mui-bar {
    height: 0.75rem;
  }

  .mui-bar .mui-btn-link {
    outline: none;
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.32rem;
  }

  .mui-bar .mui-btn-link:active {
    border: none;
  }

  #header {

  a {
    padding: 0;
    line-height: 0.75rem;
  }

  }
  }
  .shopcar_shops {
    background-color: #ffffff;

  .shopcar_shops_main {
    width: 100%;
    height: 4.53rem;

  .shopcar_null {
    padding-top: 1.1rem;
    text-align: center;

  img {
    width: 2.1rem;
    height: 2.1rem;
    padding: 0 0.42rem;
  }

  p {
    font-size: 0.22rem;
    color: #999999;
  }

  }
  }
  .shopcar_have {

  .shopcar_have_main {

  li {
    padding: 0 0.32rem;
    line-height: 2.25rem;

  div {
    padding-left: 0.2rem;
    line-height: normal;
    vertical-align: middle;
    width: 4.42rem;
    height: 1.6rem;
    display: inline-block;

  p {
    text-align: left;
    font-size: 0.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  p:nth-of-type(1) {
    padding-bottom: 0.16rem;
  }

  p:nth-of-type(2) {
    font-size: 0.22rem;
    color: #999999;
    line-height: 0.37rem;
  }

  p:nth-of-type(3) {
    color: #E54560;
    font-size: 0.25rem;
    line-height: 0.87rem;

  span {
    color: #000000;
    float: right;
  }

  }
  }
  .bac_blue {
    background-image: url(../../../static/img/shopping-bag/common_icon_chose@3x.png);
    background-size: cover;
    border: none;
  }

  &
  >
  span {
    vertical-align: middle;
    display: inline-block;
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    border: 1px solid #999;
    margin-right: 0.2rem;
  }

  img {
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: middle;
  }

  }
  .change_count {
    text-align: center;

  span {
    display: inline-block;
    width: 0.82rem;
    line-height: 0.57rem;
    border: 1px solid #999999;
  }

  span:nth-of-type(2) {
    border-left: none;
    border-right: none;
  }

  span:nth-of-type(3) {
    border-radius: 5px 0px 0px 5px;
  }

  span:nth-of-type(1) {
    border-radius: 0px 5px 5px 0px;
  }

  }
  }
  }
  }
  .shopingCar_nav {
    width: 100%;
    position: relative;
    margin-top: .96rem;

  .shopingCar_nav_main {
    display: flex;
    height: 0.96rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #F7F7F7;
    border-top: 1px solid #999999;
    text-align: left;
    justify-content: space-between;
    align-items: center;

  span {
    font-size: .27rem;
  }

  span:nth-of-type(1) {
    margin-left: .32rem;
    float: left;
    width: .42rem;
    height: .42rem;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  span:nth-of-type(2) {

    margin-left: -1.7rem;
  }

  span:nth-of-type(3) {
    color: #E54560;
    margin-right: -1.8rem;
  }

  button {
    font-size: .26rem;
    height: 100%;
    line-height: .96rem;
    padding: 0;
    border: none;
    width: 2.28rem;
    background-color: #4595E5;
    color: #ffffff;
    text-align: center;
  }

  }
  }
  }

</style>
