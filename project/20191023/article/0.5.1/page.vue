 <template>
   <article class='page'>
     {{index}}-{{name}}
  </article>
</template>
 <script>
   module.exports = {
     props:['index'],
     data:function(){
       return{
         name:'title'
       }
     }
   }
</script>
 <style>
   .page
   {
     background:grey;
   }
</style>