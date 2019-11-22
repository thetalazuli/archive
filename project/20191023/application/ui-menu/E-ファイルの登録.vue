 <template>
   <label v-ui>
     <input type='file' @change='upload' multiple>
     <i class='icon plus'>
    </i>
  </label>
</template>
 <script>
   module.exports={
     model:{
       prop:'files',
       event:'input'
     },
     props:{
       files:{
         type:Array,
         default:null,
       }
     },
     methods:{
       upload:function(e){
                  var self = this
         _.each(e.target.files,function(obj){
           self.files.push({
             file:obj,
             show:false
           })
         })

  console.dir(this.files)




        

       }
     },
     mounted:function(){

     }
   }
</script>
 <style>
.E-ファイルの登録 input{
     display:none;
   }
</style>