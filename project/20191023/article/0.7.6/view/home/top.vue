 <template>
   <article class='home bottom ui segments'>
     <section class='ui segment'>
       <nav @click='slide' class='ui label corner'>
         <i :class="['icon',views[idx].icon]"></i>
      </nav>
       <router-view>
      </router-view>
    </section>
  </article>
</template>
 <script>
   module.exports={
     methods:{
       slide:function(){
         this.idx = (this.idx+1) % this.views.length
         this.$router.push(this.views[this.idx].path)
       }
     },
     data:function(){
       return{
         idx:0,
         views:[
           {path:'/home/about',icon:'home'},
           {path:'/home/how-to',icon:'help'},
           {path:'/home/developers',icon:'users'}
         ]
       }
     }
   }
</script>
 <style>
   .home.bottom .ui.segment{
     padding:0;
   }
</style>