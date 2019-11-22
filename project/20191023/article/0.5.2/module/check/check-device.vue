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
     model:{
       prop:'db',
       event:'input'
     },
     props:{
       db:{
         type:Object,
         default:null,
         required:true
       },
       service:{
         type:String,
         default:'',
         required:true
       }
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'device'
         }
       }
     },
     methods:{
       getUA:function(){
         var self = this
         fetch('http://api.userstack.com/detect?access_key=' + this.service + '&ua=' + window.navigator.userAgent)
        .then(function(response){
           return response.json()
         })
        .then(function(json){
           self.$emit('input',self.db = self.$parent.flatten(json,'-'))
         })
       }
     },
     created:function(){
       this.getUA()
     }
   }
</script>
 <style>
</style>