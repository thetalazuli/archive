 <template>
   <article v-ui v-if='package'>
     <section v-if='boot>=0'>
       <h3 v-divider>native</h3>
       <load-scripts v-model='package.list.native' :meta='package.settings' url='/js/native/' @ready='next' v-control>
      </load-scripts>
    </section>
     <section v-if='boot>=1'>
       <h3 v-divider>jquery</h3>
       <load-scripts v-model='package.list.jquery' :meta='package.settings' url='/js/jquery/plugin/' @ready='next' v-control>
      </load-scripts>
    </section>
     <section v-if='boot>=2'>
       <h3 v-divider>vue</h3>
       <load-scripts v-model='package.list.vue' :meta='package.settings' url='/js/vue/plugin/' @ready='next' v-control>
      </load-scripts>
    </section>
  </article>
</template>
 <script>
   module.exports={
     model:{
       prop:'package',
       event:'input'
     },
     props:{
       package:{
         type:Object,
         default:null,
         required:true
       }
     },
     components:[
       'url:module/load/load-scripts.vue'
     ],
     data:function(){
       return{
         boot:0
       }
     },
     watch:{
       boot:{
         handler:function(val){
           if(val >= 3){
             this.$emit('completed')
           }
         }
       }
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'load-package'
         }
       }
     },
     methods:{
       next:function(){
         this.boot++
       }
     }
   }
</script>
 <style>
   #load-package .ui.card{
     width:100%;
     overflow:hidden;
   }
   #load-package .ui.table thead th,
   #load-package .ui.table tbody td{
     padding:0;
   }
   #load-package .ui.table thead th{
     text-transform:uppercase;
   }
   #load-package .ui.table thead th:first-child,
   #load-package .ui.table tbody td:first-child{
     width:12.5%;
     text-align:center;
   }
   #load-package .ui.card,
   #load-package .ui.header{
     box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0;
   }
   #load-package .ui.divider,
   #load-package .ui.table thead th{
     font-weight:normal;
   }
</style>