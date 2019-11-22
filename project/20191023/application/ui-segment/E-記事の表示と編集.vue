 <template>
   <div :class="[color,{'fitted':page.fitted}]" v-ui>
     <div :class="['ui','labels',color]" v-if='canedit'>
       <slot name='labels'>
      </slot>
       <div @click='fit' class='ui label'>
         <i class='icon expand'>
        </i>
      </div>
       <div @click='edit' class='ui label'>
         <i class='icon edit'>
        </i>
      </div>
   </div>
    <div ref='view' class='viewer'>
      <div v-html='page.html'>
     </div>
    </div>
     <div class='editor' v-if='isEditing && canedit'>
       <codemirror v-model='page.html'>
      </codemirror>
    </div>
  </div>
</template>
 <script>
   module.exports={
     computed:{
       isEditing:function(){
         return this.page.editing
       }
     },
     model:{
       prop:'page',
       event:'input'
     },
     props:{
       page:{
         type:Object,
         default:null,
       },
       color:{
         type:String,
         default:null
       },
       canedit:{
         type:Boolean,
         default:true
       }
     },
     methods:{
       fit:function(){
         if(this.$refs.view.clientHeight > 48){
           this.page.fitted = !this.page.fitted
         }
       },
       edit:function(){
         this.page.editing = !this.page.editing
       }
     }
   }
</script>
 <style>
   .E-記事の表示と編集.noborder{
     border-top:1px solid rgba(34,36,38,.15) !important;
   }
   .E-記事の表示と編集 .editor .CodeMirror{
     font: 12px 'M+2VM+IPAG circle';
     background:transparent;
     height:315px;
   }
   .E-記事の表示と編集 .editor .CodeMirror pre.CodeMirror-line,
   .E-記事の表示と編集 .editor .CodeMirror pre.CodeMirror-line-like{
     padding:0;
   }
</style>