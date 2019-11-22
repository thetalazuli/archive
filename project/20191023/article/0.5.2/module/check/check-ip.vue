 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed'>
       <thead>
         <tr>
           <th v-no>no</th>
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
     model:{
       prop:'db',
       event:'input'
     },
     props:{
       db:Object,
       default:null,
       required:true
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'ip'
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
</style>