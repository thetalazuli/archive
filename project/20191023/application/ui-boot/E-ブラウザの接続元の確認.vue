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
         db:{

         }
       }
     },
     methods:{
       getIP:function(){
         var self = this
         fetch('https://ipapi.co/json/')
        .then(function(response){
           return response.json()
         })
        .then(function(json){
           self.$emit('input',self.db = json)
         })
       }
     },
     created:function(){
       this.getIP()
     }
   }
</script>
 <style>
   .E-ブラウザの接続元の確認 .ui.table>thead>tr>th,
   .E-ブラウザの接続元の確認 .ui.table>tbody>tr>td{
     padding:0;
   }
  .E-ブラウザの接続元の確認 .ui.table thead th{
     text-transform:uppercase;
   }
   .E-ブラウザの接続元の確認 .ui.table>thead>tr>th:first-child,
   .E-ブラウザの接続元の確認 .ui.table>tbody>tr>td:first-child{
     width:12.5%;
     text-align:center;
   }
</style>