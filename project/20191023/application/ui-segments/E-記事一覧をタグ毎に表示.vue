 <template>
   <div v-ui>

     <div class='ui labels blue'>
       <div class='ui label ribbon'>
         タグ
      </div>
       <div class='ui label'>
         タグの数
         <div class='ui detail'>
           {{_.keys(store.labels).length}}
        </div>
      </div>
       <div class='ui label'>
         記事の数
         <div class='ui detail'>
           {{_.keys(store.pages).length}}
        </div>
      </div>
    </div>

    <div class='ui segments'>

       <div class='ui card fluid'>
         <div class='image'>
           <img src='asset/image/un-draw/book_lover_mkck.png'>
        </div>
         <div class='ui label corner' @click='toggle'>
           <i class='icon edit'>
          </i>
        </div>
         <div class='content'>
           <div class='header'>
             Note
          </div>
           <div class='description'>
             <p>...</p>
          </div>
        </div>
      </div>

       <template v-if='show'>
       <template v-for='(draft,name,i) in drafts'>

         <template v-if='expanded(name)'>
           <template v-for='(attribute,ctime,n) in store.labels[name]'>
             <E-記事の表示と編集 v-model='store.pages[ctime]' :color='colors[i]' class='ui segment noborder'>
               <template v-slot:labels>
                 <div class='ui label index'>
                   {{ ctime | MMDD }}
                </div>
                 <div @click='removePage(ctime)' class='ui label'>
                   <i class='icon trash'>
                  </i>
                </div>
              </template>
            </E-記事の表示と編集>
          </template>
        </template>

         <template v-if='expading ? expanded(name) : true'>
           <E-記事の表示と編集 v-model='drafts[name]' :color='colors[i]' class='ui segment'>
             <template v-slot:labels>
               <div @click='expand(name)' class='ui label right pointing'>
                  {{ expading ? _.keys(store.labels[clicked]).length : name }}
              </div>
               <div @click='insertPage(drafts[name])' class='ui label'>
                 <i class='icon save'>
                </i>
              </div>
            </template>
          </E-記事の表示と編集>
        </template>

      </template>
      </template>

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
         required:true
       },
     },

     data:function(){
       return{
         clicked:null,
       }
     },
     computed:{
       expading:function(){
         return this.clicked != null
       }
     },
     methods:{
       expanded:function(name){
         return this.clicked == name
       },
       expand:function(name){
         this.clicked = this.clicked != name ? name : null
       },
       edit:function(name){
         this.drafts[name].editing = !this.drafts[name].editing
       },
     }
   }
</script>
 <style>
</style>