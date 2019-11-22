 <template>
   <article v-ui>
     <section>
       <h3 v-divider>
         ソフトウェア開発に関して、利用・改変・配布に対する説明
      </h3>
       <say-license v-control>
      </say-license>
    </section>
     <section>
       <h3 v-divider>
         ユーザの個人情報に関して、取得・用途・保護に対する説明
      </h3>
       <say-policy v-control>
      </say-policy>
    </section>
     <section>
       <h3 v-divider>
         プラットフォームに関して、特徴・利用・規定に対する説明
      </h3>
       <say-rule v-control>
      </say-rule>
    </section>
  </article>
</template>
 <script>
   module.exports={
     props:{
       since:{
         default:'',
         type:String,
         required:true
       },
       author:{
         default:'',
         type:String,
         required:true
       }
     },
     provide:function(){
       return{
         author:this.author,
         since:this.since
       }
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'app'
         }
       }
     },
     components:[
       'url:module/say/say-rule.vue',
       'url:module/say/say-policy.vue',
       'url:module/say/say-license.vue'
     ]
   }
</script>
 <style>
   #app .ui.card{
     width:100%;
     overflow:hidden;
   }
   #app .ui.card,
   #app .ui.header{
     box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0;
   }
   #app .ui.card .description p{
     color:black;
     font:12px 'M+2VM+IPAG circle';
   }
   #app .ui.divider{
     font-weight:normal;
   }
</style>