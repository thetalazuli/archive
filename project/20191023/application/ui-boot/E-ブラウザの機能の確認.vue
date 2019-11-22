 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed very basic'>
       <thead>
         <tr>
           <th>no</th>
           <th>feature</th>
           <th>result</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in features'
           :class='{
             positive:result == true,
             negative:result == false}' v-show='result == false'>
           <td>{{no+1}}</td>
           <td>{{name}}</td>
           <td>{{result}}</td>
        </tr>
     </tbody>
   </table>
  </section>
</template>
 <script>
   module.exports={
     data:function(){
       return{
         modernizr:{

         }
       }
     },
     mounted:function(){
       this.modernizr = window['Modernizr']
     },
     computed:{
       features:function(){
         return this.flatten(this.modernizr,'-')
       }
     },
     methods:{
       flatten:function(obj,sep){
         var out
         var flatObj
         var toReturn = {};
        
         for (var key in obj) {
           var val = obj[key]
           
           if(!obj.hasOwnProperty(key))
             continue
           if(typeof(val) === 'object'){
             flatObj = this.flatten(val,sep)
             for(k in flatObj){
               if(flatObj.hasOwnProperty(k))
                 toReturn[key+sep+k] = flatObj[k]
               else{
                 continue
               }
             }
           }else{
             toReturn[key] = val
           }
         }
         return toReturn 
       }
     }
   }
</script>
 <style>
.E-ブラウザの機能の確認 .ui.table>thead>tr>th,
.E-ブラウザの機能の確認 .ui.table>tbody>tr>td{
     padding:0;
   }
.E-ブラウザの機能の確認 .ui.table thead th{
     text-transform:uppercase;
   }
 .E-ブラウザの機能の確認 .ui.table>thead>tr>th:first-child,
.E-ブラウザの機能の確認 .ui.table>tbody>tr>td:first-child{
     width:12.5%;
     text-align:center;
   }
</style>