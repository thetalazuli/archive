 <template>
   <div v-ui>

   <!--
     <div class='ui labels blue'>
       <div class='ui label pointing below'>
         参考
      </div>
       <div class='ui label'>
         容量
         <div class='ui detail'>
           12.5MB
        </div>
      </div>
    </div>
-->
       
     <template v-for='(obj,key) in files'>
     <div class='ui segments'>
       <div class='ui segment'>

         <div class='ui labels blue' @click='files[key].show = !files[key].show'>
           <div class='ui label'>
             {{ obj.file.lastModified | MMDD }}
          </div>
           <div class='ui label right pointing' @click='remove(key)'>
             <i class='icon remove'>
            </i>
          </div>
        </div>
         <component v-if='obj.show' :is="obj.file.type.replace('/','-')" v-model='obj.file'>
        </component>
      </div>
         </div>
    </template>
    
  </div>
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
   components:{
        'application-pdf':'url:application/ui-segment/file/E-PDFの埋込.vue'

   },
     methods:{
       remove:function(key){
         this.$delete(this.files,key)
       }
     },
     mounted:function(){

     }
   }
</script>
 <style>
</style>