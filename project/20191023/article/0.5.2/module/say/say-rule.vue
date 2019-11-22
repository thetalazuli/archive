 <template>
   <section v-ui>
     <div class='content'>
       <div class='description'>
         <p>本ソフトウェアを利用・投稿した情報から引き起こされる全ての結果に対して利用者は責任を負う。利用者に事前に通知することなく、いつでも独自の判断により利用と保存に制限を設ける権利を留保する。この行使によって生じた結果の全てに責任を負わない。</p>
      </div>
    </div>
     <div class='extra content'>
      <span class='right floated detail'>
        {{since}} | RULE by {{author}}
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
           el.id = 'rule'
         }
       }
     }
   }
</script>
 <style>
</style>