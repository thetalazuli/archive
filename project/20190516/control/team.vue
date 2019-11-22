 <template>
   <section v-ui>
     <header>
       <div class='pointing below no' @click='toggle' data-micron='bounce' v-sign>
         {{no}}
      </div>
       <label class='icon button' v-sign>
         <div class='pretty p-icon p-toggle'>
           <input type='checkbox' />
           <div class='state p-success-o p-on'>
             <i class='icon toggle-on'>
            </i>
             <label>
            </label>
          </div>
           <div class='state p-info-o p-off'>
             <i class='icon toggle-off'>
            </i>
             <label>
            </label>
          </div>
        </div>
      </label>
       <span class='ui detail'>
         {{detail}}
      </span>
    </header>
     <article v-show='isShow'>
       <div v-controls>
         <div v-control>
           thank you amark. this gunDB data-table
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
          el.classList.add('team')
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
   .team .pretty{
     margin-right:0;
   }
</style>