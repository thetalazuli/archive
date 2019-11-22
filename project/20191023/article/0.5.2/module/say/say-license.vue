 <template>
   <div v-ui>
     <div class='content'>
       <div class='description'>
         <p>本ソフトウェアの使用・複製・変更・結合・販売・頒布・許諾を許可する。但し本許諾表示と下記の著作権表示を全ての複製又は重要な箇所に記載することを条件とし、現状のまま提供され、これらに起因する如何なる損害・請求・義務について責任を負わない。</p>
      </div>
    </div>
     <div class='extra content'>
      <span class='right floated detail'>
        {{since}} | COPYRIGHT by {{author}}
     </span>
    </div>
  </div>
</template>
 <script>
   module.exports={
     inject:['author','since'],
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'license'
         }
       }
     }
   }
</script>
 <style>
</style>