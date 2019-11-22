 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed attached'>
       <thead>
         <tr>
           <th v-no>no</th>
           <th>package</th>
           <th>version</th>
           <th>license</th>
           <th>author</th>
        </tr>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in packages'
           :class='{
             positive:result.loaded == true,
             negative:result.loaded == false}'>
           <td>{{no+1}}</td>
           <td><a :href='result.link'>{{name}}</a></td>
           <td>{{result.main}}</td>
           <td>{{result.license}}</td>
           <td>{{result.author}}</td>
        </tr>
      </tbody>
    </table>
     <div class='ui message error mini attached bottom' v-if='has_exception'>
       {{exception}}
    </div>
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
       url:{
         type:String,
         default:'',
         required:true
       },
       meta:{
         type:Object,
         default:{},
         required:true
       }
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'strap'
         }
       }
     },
     computed:{
       has_exception:function(){
         return this.exception.length > 0
       }
     },
     data:function(){
       return{
         baseURL    :this.url,
         minify     :true,
         exception  :[],
         transpiler :'traceur',
         packages   :this.db,
         meta       :this.meta
       }
     },
     methods:{
       import:function(){
         var self = this
         return Object.keys(self.packages).map(function(name){
           return System.import(name).then(
             function(ok)   { self.packages[name].loaded = true },
             function(fail) { self.packages[name].loaded = false
                              self.exception.push(fail.message)
             }
           )
         })
       },
       construct:function(){
         var self=this
         Object.values(this.packages).forEach(function(package){
           self.$set(package,'defaultExtension',self.minify ? 'min.js' : 'js')
           self.$set(package,'loaded',null)
         })
       },
       config:function(){
         System.config(this.$data)
       },
       exec:function(){
         var self = this
         Promise.all(this.import()).then(function(){
           if(!self.has_exception){
             self.$emit('ready')
           }
         })
       }
     },
     created:function(){
       this.construct()
       this.config()
       this.exec()
     }
   }
</script>
 <style>
   #strap .ui.mini.message {
     box-shadow: none;
     border: none;
   }
</style>