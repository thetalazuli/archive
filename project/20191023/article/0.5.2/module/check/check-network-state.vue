 <template>
   <div v-ui>
     <div v-divider>P2Pネットワークの状況説明</div>
  </div>
</template>
 <script>
   module.exports={
     directives:{
       'ui':function(el){
         el.id = 'check-network-state'
       }
     }
   }
</script>
 <style>
</style>