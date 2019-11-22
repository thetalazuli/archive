 <template>
   <section v-ui>
     <div class='content'>
       <div class='description'>
         <p>本ソフトウェアは利用者の端末から情報を収集する。目的はサービスとしての提供・改良・開発・利用動向の把握・安全性と信頼性の向上のほか、技術的な問題の検知・防止などがあって古い端末のサポートも含む。これらの情報によって、個人は特定されない。</p>
      </div>
    </div>
     <div class='extra content'>
      <span class='right floated detail'>
        {{since}} | POLICY by {{author}}
     </span>
    </div>
  </section>
</template>
 <script>
   module.exports={
     inject:['author','since'],
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'policy'
         }
       }
     }
   }
</script>
 <style>
</style>