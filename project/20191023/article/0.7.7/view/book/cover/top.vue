 <template>
   <div>

   

<div class="ui segments">
       <nav @click='slide' class='ui label corner'>
         <i :class="['icon',views[idx].icon]"></i>
      </nav>

      <router-view>
     </router-view>

      <router-view v-for='i in 3' name='editingdoc'>
     </router-view>
    
    </div>


    
    </div>
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
         content:'',
         idx:0,
         views:[
           {path:'/book/cover',icon:'image'},
           {path:'/book/index',icon:'tags'},
           {path:'/book/edit',icon:'edit'}
         ]
       }
     },
     computed:{
       header:function(){
         return this.$store.getters.header
       }
     }
   }
</script>
 <style>


.post .ui.segment {
  padding: 2em 1em !important;
}
.ui.segment.editor{
  padding:0;
}

</style>