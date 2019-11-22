 <template>
   <div v-ui>
     <div ref='labels' class='ui dropdown selection multiple search labels'>
       <input name='labels' type='hidden'>
       <div class='default text'>
         <div class='ui label orange'>
           <i class='icon tags'>
          </i>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
   module.exports={
     model:{
       prop:'drafts',
       event:'input'
     },
     props:{
       drafts:{
         type:Object,
         default:null,
       },
       skelton:{
         type:Object,
         default:null
       }
     },
     watch:{
       drafts:{
         handler:function(obj){
           var self = this
           _.keys(obj).forEach(function(name,i){
             self.drafts[name].color = self.colors[i]
           })
         }
       }
     },
     methods:{
       construct:function(){
         var self = this
         $(this.$refs.labels).dropdown({
      　   allowAdditions:true,
           onLabelSelect  :self.select,
           onRemove       :self.remove,
           onAdd          :self.create
         })
       },
       create:function(name){
         var draft = _.clone(this.skelton,true)

         console.dir(this.drafts)
         this.$set(this.drafts,name,_.assign(draft,{
           editing:false,
           tag:name
         }))
       },
       remove:function(name){
         this.$delete(this.drafts,name)
       },
       select:function($dom){
         this.$emit('select',$dom.dataset.value)
       }
     },
     mounted:function(){
       this.construct()
     }
   }
</script>
 <style>
  /*
   * 構造
   */
   .E-記事の作成 .ui.multiple.search.dropdown>.text>.ui.label>.icon{
     font-size:10px;
   }
   .E-記事の作成 .ui.multiple.search.dropdown>input.search{
     margin:.43238095em 0 .43238095em .64285714em;
     vertical-align:middle;
   }
   .E-記事の作成 .ui.multiple.search.dropdown>.text{
     margin:0;
   }
   .E-記事の作成 .ui.multiple.dropdown>.label{
     font-size:.85714286rem;
     padding:.5833em .833em;
     margin-bottom:0;
     margin-top:0;
   }
   .E-記事の作成 .ui.label>.delete.icon {
     display:none;
   }
   .E-記事の作成 .ui.selection.dropdown{
     background:transparent;
     vertical-align:top;
     min-height:auto;
     border:none;
     width:100%;
   }
   .E-記事の作成  .ui.selection.active.dropdown .menu{
     border:none;
   }
   .E-記事の作成 .ui.label>.icon{
     margin-right:0;
   }
  /*
   * 色分
   */
   .E-記事の作成 .ui.label:nth-of-type(1){
     background-color:#767676;
     border-color:#767676;
   }
   .E-記事の作成 .ui.label:nth-of-type(2){
     background-color:#a5673f;
     border-color:#a5673f;
   }
   .E-記事の作成 .ui.label:nth-of-type(3){
     background-color:#e03997;
     border-color:#e03997;
   }
   .E-記事の作成 .ui.label:nth-of-type(4){
     background-color:#a333c8;
     border-color:#a333c8;
   }
   .E-記事の作成 .ui.label:nth-of-type(5){
     background-color:#6435c9;
     border-color:#6435c9;
   }
   .E-記事の作成 .ui.label:nth-of-type(6){
     background-color:#2185d0;
     border-color:#2185d0;
   }
   .E-記事の作成 .ui.label:nth-of-type(7){
     background-color:#00b5ad;
     border-color:#00b5ad;
   }
   .E-記事の作成 .ui.label:nth-of-type(8){
     background-color:#21ba45;
     border-color:#21ba45;
   }
   .E-記事の作成 .ui.label:nth-of-type(9){
     background-color:#b5cc18;
     border-color:#b5cc18;
   }
   .E-記事の作成 .ui.label:nth-of-type(10){
     background-color:#fbbd08;
     border-color:#fbbd08;
   }
   .E-記事の作成 .ui.label:nth-of-type(11){
     background-color:#f2711c;
     border-color:#f2711c;
   }
   .E-記事の作成 .ui.label:nth-of-type(12){
     background-color:#db2828;
     border-color:#db2828;
   }
   .E-記事の作成 .ui.label.active{
     background-color:white!important;
     border-color:white!important;
     color:black!important;
   }
   .E-記事の作成 .ui.label{
     color:white;
   }
</style>