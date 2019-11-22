 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed'>
       <thead>
         <tr>
           <th v-no>no</th>
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
     model:{
       event:'input',
       prop:'features'
     },
     props:{
       default:null,
       required:true,
       features:Object
     },
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'browser-feature'
         }
       }
     },
   }
</script>
 <style>
</style>