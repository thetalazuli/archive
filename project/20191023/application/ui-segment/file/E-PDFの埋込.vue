 <template>
   <div v-ui>
     <iframe :src='blobURL'>
    </iframe>
  </div>
</template>
 <script>
   module.exports={
     model:{
       prop:'file',
       event:'input'
     },
     props:{
       file:{
         type:File,
         default:null,
       }
     },
     computed:{
       blobURL:function(){
         return URL.createObjectURL(this.file)
       }
     },
     mounted:function(){
       console.dir(
         URL.createObjectURL(this.file)
       )
     }
   }
</script>
 <style>
   .application-pdf iframe{
     width:100%;
     border:none;
     height:512px;
     outline:none;
   }
</style>