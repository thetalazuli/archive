 <template>
   <article v-ui>
     <give-platform v-control>
    </give-platform>    
  </article>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'service'
         }
       },
       'header':{
         inserted:function(el){
           el.classList.add('ui','icon','fluid')
           el.classList.add('header','center','aligned')
           el.classList.add('pointing','below','label','teal')
         }
       },
       'control':{
         inserted:function(el){
           el.classList.add('ui','card')
         }
       },
       'controls':{
         inserted:function(el){
           el.classList.add('ui','stackable','cards')
         }
       }
     },
     components:[
       'url:module/give/give-platform.vue',
       'url:module/give/give-relation.vue',
       'url:module/give/give-server.vue',
     ]
   }
</script>
 <style>
   #service > .ui.card{
     width:100%;
     overflow:hidden;
   }
   #service > .ui.card,
   #service > .ui.header{
     box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0;
   }
   #service > .ui.card .description p{
     color:black;
     font:12px 'M+2VM+IPAG circle';
   }
</style>