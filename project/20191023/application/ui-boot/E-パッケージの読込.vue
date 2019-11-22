 <template>
   <div v-ui>
     <table class='ui table single line unstackable celled attached fixed very basic'>
       <thead>
         <tr>
           <th>no</th>
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
     <div v-if='has_exception' class='ui message error mini attached'>
       <div v-for='body in exception'>
         {{body}}
      </div>
    </div>
  </div>
</template>
 <script>
   module.exports={

     props:{
       list:{
         type:Object,
         default:null,
         required:true
       },
       settings:{
         default:{},
         type:Object,
         required:true
       },
       location:{
         default:'',
         type:String,
         required:true
       }
     },
     computed:{
       has_exception:function(){
         return this.exception.length > 0
       }
     },
     data:function(){
       return{
         baseURL    :this.location,
         minify     :true,
         exception  :[],
         transpiler :'traceur',
         packages   :this.list,
         meta       :this.settings
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
             self.$emit('loaded')
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
   .E-パッケージの読込{
     overflow:hidden;
   }
   .E-パッケージの読込 .ui.table>thead>tr>th,
   .E-パッケージの読込 .ui.table>tbody>tr>td{
     padding:0;
   }
   .E-パッケージの読込 .ui.table thead th{
     text-transform:uppercase;
   }
   .E-パッケージの読込 .ui.table>thead>tr>th:first-child,
   .E-パッケージの読込 .ui.table>tbody>tr>td:first-child{
     width:12.5%;
     text-align:center;
   }
   .E-スクリプトの読込 .ui.mini.message {
     box-shadow:none;
     border:none;
   }
</style>