 <template>
   <div v-ui>

     <div class='ui labels blue'>
       <div class='ui label ribbon'>
         予定
      </div>
    </div>
   
   <div class='ui segments'>
     <div class='ui card fluid'>
       <div class='ui label corner' @click='toggle'>
         <i class='icon edit'>
        </i>
      </div>
       <div class='image'>
         <img src='asset/image/un-draw/calendar_dutt.png'>
      </div>
       <div class='content'>
         <div class='header'>
           Calendar
        </div>
         <div class='description'>
           <p>...</p>
        </div>
      </div>
    </div>
    


  <template v-if='show'>

       <template v-for='(dtime,i) in range'>

         <div :class="['ui segment',getClass(dtime).segment]">
           <div class='ui labels'>
             <div @click='expand(dtime)' :class="['ui label right pointing',getClass(dtime).label]">
               {{ dtime | MMDD }}
            </div>
             <template v-for='(draft,name,i) in drafts'>
               <div @click='insertPage(draft,dtime)' :class="['ui label pointing below index',draft.color]">
                 {{name}}
              </div>
            </template>
          </div>

           <template v-if='hasDay(dtime).favorite'>
             <div v-html='store.pages[store.calendar[dtime].favorite].html'>
            </div>
          </template>
       

     
        </div>

   
  





         <template v-if='hasDay(dtime)'>
           <template v-if='store.calendar[dtime].show'>
             <template v-if="filteredItem ? store.pages[timestamp].tag == filteredItem : true" v-for='(obj,timestamp,i) in store.calendar[dtime].keys'>
               <E-記事の表示と編集 v-model='store.pages[timestamp]' :color="_.has(drafts,store.pages[timestamp].tag) ? drafts[store.pages[timestamp].tag].color : null" class='ui segment noborder'>
                 <template v-slot:labels>
                   <div @click='changeFilter(store.pages[timestamp].tag)' :class="['ui','label','index']">
                     {{store.pages[timestamp].tag}}
                     <div class='ui detail' v-if='dtime != store.pages[timestamp].schedule'>
                       予定：{{ store.pages[timestamp].schedule | MMDD }} 
                    </div>
                  </div>

                   <div @click='favoritePage(timestamp,dtime)' class='ui label'>
                     <i class='icon heart'>
                    </i>
                  </div>
                   <div @click='removePage(timestamp)' class='ui label'>
                     <i class='icon trash'>
                    </i>
                  </div>
                </template>
              </E-記事の表示と編集>
            </template>
            
          </template>
        </template>



      </template>
   </template>

</div>


  </div>
</template>
 <script>
   module.exports={

     directives:{
       'ui':{
         inserted:function(el,binding,vnode){
           el.classList.add(vnode.context.$options.name)
         }
       }
     },
     model:{
       prop:'drafts',
       event:'input'
     },
     props:{
       range:{
         type:Array,
         default:null
       },
       drafts:{
         type:Object,
         default:null
       }
     },
     computed:{
       today:function(){
         return moment().set({h:0,m:0,s:0,ms:0}).valueOf()
       },

     },
     data:function(){
       return{
         filteredItem:null
       }
     },
     methods:{
       hasDay:function(dtime){
         return dtime in this.store.calendar ? this.store.calendar[dtime] : false
       },
       getClass:function(dtime){
         return {
           segment:{'orange':this.today == dtime},
           label:this.today == dtime ? 'orange' : 'blue'
         }
       },

       changeFilter:function(name){
         this.filteredItem = this.filteredItem == name ? null : name
       },


       expand:function(dtime){
         if(_.has(this.store.calendar,dtime)){
           this.store.calendar[dtime].show = !this.store.calendar[dtime].show
         }
       },
       construct:function(){
       }
     }
   }
</script>
 <style>
</style>