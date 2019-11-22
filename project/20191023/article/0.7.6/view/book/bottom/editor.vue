 <template>
   <div>


     <div class='ui segments'>
       <div class='ui segment editor'>
       <!--
        HTMlの入力として{CodeMirror,MarkDown,WYSIWYG}の両方を選べる。あと直接入力モード
        グローバルナビの左端に[edit-icon]が１つ増える
        動作モードはエディットであることを示している
        その隣にdat-guiがポップアップされ
        リフィルを挿入可能
         -->
        <codemirror v-model='content'>
       </codemirror>

      </div>
    </div>


     <div class='ui segments'>
       <div class='ui segment'>
          <nav class="ui labels grey"><div class='ui label'><i class='icon plus'></i></div></nav>
       　ここにはファイルビュアー
       　引用が楽いなる
      　 ファイルを選択するとMIME-TYPEによって
      リフィルを介してHTMLが挿入される
      </div>
    </div>

  </div>
</template>
 <script>
   module.exports={
     data:function(){
       return{
         content:''
       }
     }
   }
</script>
 <style>
  .ui.segment.editor{
    padding:0;
  }
</style>