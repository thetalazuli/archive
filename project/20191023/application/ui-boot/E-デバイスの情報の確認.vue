 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed very basic'>
       <thead>
         <tr>
           <th>no</th>
           <th>name</th>
           <th>value</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in db'>
           <td>{{no + 1}}</td>
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
         db:{
         }
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
       },
       getUA:function(){
         var self = this
         fetch('http://api.userstack.com/detect?access_key=96c9e83d40c6402d9867e54e24bd0619&ua=' + window.navigator.userAgent)
        .then(function(response){
           return response.json()
         })
        .then(function(json){
           self.$emit('input',self.db = self.flatten(json,'-'))
         })
       }
     },
     created:function(){
       this.getUA()
     }
   }
</script>
 <style>
  .E-デバイスの情報の確認 .ui.table>thead>tr>th,
  .E-デバイスの情報の確認 .ui.table>tbody>tr>td{
      padding:0;
    }
  .E-デバイスの情報の確認 .ui.table thead th{
      text-transform:uppercase;
    }
  .E-デバイスの情報の確認 .ui.table>thead>tr>th:first-child,
  .E-デバイスの情報の確認 .ui.table>tbody>tr>td:first-child{
      width:12.5%;
      text-align:center;
    }
</style>