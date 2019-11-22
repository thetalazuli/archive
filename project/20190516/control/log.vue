 <template>
   <section v-ui>
     <header>

       <div class='pointing below no' @click='toggle' data-micron='bounce' v-sign>
         {{no}}
      </div>

      　<label class='icon button' v-sign>
          <i class='icon trash'></i>
       </label>

        <span class='ui detail'>{{detail}}</span>
    </header>
     <article v-show='isShow'>

       <div v-controls>
         <div v-control>
           <data-table
             class='fixed'
             :rows='dbArr'
             :keys='dbTableKeys'>
          </data-table>
        </div>
      </div>

    </article>
  </section>
</template>
 <script>
  module.exports={
    directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('log')
        }
      }
    },
    model:{
      prop:'db',
      event:'input'
    },
    props:{
      no:Number,
      db:Object,
      detail:String,
      isShow:Boolean
    },
    data:function(){
      return{
      }
    },
    computed:{
      dbArr:function(){
        return this.db.arr
      },
      dbTableKeys:function(){
        return this.db.table.keys
      },
    },
    methods:{
      toggle:function(){
        this.isShow = !this.isShow
      }
    },
    mounted:function(){
    }
  }
</script>
 <style>
</style>