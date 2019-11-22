 <template>
   <section v-ui>
     <header>
       <div class='pointing below no' @click='toggle' data-micron='bounce' v-sign>
         {{no}}
      </div>
       <label class='icon button' v-sign>
         <i class='icon trash'>
        </i>
      </label>
       <span class='ui detail'>{{detail}}</span>
    </header>
     <article v-show='isShow'>
       <div v-controls>
         <div v-control>
           <ridge-line
              style='height:159px;'
              :src.sync='dbArr'
              :keys='dbChartKeys'>
          </ridge-line>
        </div>
         <div v-control>
           <stacked-bar
             style='height:92px;'
            :src.sync='sampleData'
            :keys='dbChartKeys'>
         </stacked-bar>
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
          el.classList.add('pile')
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
      sampleData:function(){
        return [
          { label: '回収', value: _.sumBy(this.dbArr,'回収') },
          { label: '寝室', value: _.sumBy(this.dbArr,'寝室') },
          { label: '浴室', value: _.sumBy(this.dbArr,'浴室') },
          { label: '仕上', value: _.sumBy(this.dbArr,'仕上') },
          { label: '台車', value: _.sumBy(this.dbArr,'台車') }
        ]
      },
      dbArr:function(){
        return this.db.arr
      },
      dbChartKeys:function(){
        return this.db.chart.keys
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
   path{
     stroke:'black';
     stroke-width:0;
   }
   path.task{
     opacity:0.66;
   }
</style>