 <template>
    <div class="ui card fluid">
      <div class="content">
        <a class="header"><input type='text' v-model='header.title' v-autosize></a>
        <div class="meta">
          <span class="date">Published in 2019</span>
        </div>
        <div class="description">
          <textarea v-model='header.description' v-autosize>
          </textarea>
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
</template>
 <script>
   module.exports={
     computed:{
       header:function(){
         return this.$store.getters.header
       }
     }
   }
</script>
 <style>
</style>