 <template>
   <div v-ui>
     <div ref='calendar' class='ui calendar'>
       <div class='ui input left icon'>
         <i class='icon calendar'></i>
         <input type='text' placeholder=''>
      </div>
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
     props:{
       options:{
         type:Object,
         default:null
       }
     },
     methods:{
       construct:function(){
         var self = this
         $(this.$refs.calendar).calendar(
           Object.assign(this.settings,this.options,{
             onSelect:function(date,mode){
               self.$emit('selected',date)
             }
           })
         )
       }
     },
     data:function(){
       return{
         settings:{
           type:'date',
           selectAdjacentDays:true,
           formatter:{
             dayHeader:function(date,settings){
               return date.getFullYear()+'年'+settings.text.months[date.getMonth()]+'月'
             },
             date:function(date,settings){
               return date?date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate():''
             }
           },
           popupOptions: {
             position    :'bottom left'
           },
           text:{
             days        :['日','月','火','水','木','金','日'],
             months      :['1','2','3','4','5','6','7','8','9','10','11','12'],
             monthsShort :['1','2','3','4','5','6','7','8','9','10','11','12'],
             today       :'本日',
             now         :'現在',
             am          :'午前',
             pm          :'午後'
           }
          }
        }
     },
     mounted:function(){
       this.construct()
     }
   }
</script>
 <style>
.E-カレンダの日付の指定 .ui.input>input{
     border:none;
     background:transparent;
     padding:.66757143em 1em;
   }
</style>