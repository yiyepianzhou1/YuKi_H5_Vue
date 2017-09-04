<template>
    <div id="apps">
      <h1>详情页</h1>
      <div class="details_banner">
      </div>
      <h2>{{ids}}</h2>
    </div>
</template>
<script type='es6'>
  import Api from '../commom/API.js'
     export default {
     data(){
         return {
           ids:this.$route.query.ids
         }
     },
       created(){
         this.findGoodDetail()
       },
       methods:{
         findGoodDetail(){
           var url = Api.Apis+'/h5/h5good/findGoodDetail'
           this.$http.post(url).then(function(data){
             console.log(data.body)

           })
         }
       }
   }
</script>
<style lang='less' scoped>

</style>
