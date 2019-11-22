 <template>
   <section v-ui>
     <header>
       <div class='pointing below no' @click='toggle' data-micron='bounce' v-sign>
         {{no}}
      </div>
       <label for='img' class='icon button' v-sign>
         <i class='icon camera'>
        </i>
      </label>
       <input
         id='img'
         type='file'
         accept='image/*'
         @change='capture'
         capture>
         <span v-if='sheetSize' v-sign>
           {{sheetSize}}
        </span>
         <span class='ui detail'>
           {{detail}}
        </span>
    </header>
     <article v-show='isShow'>
       <div v-controls>
         <div v-control>
           <div class="image">
             <img ref='sheetViewer' :src='sheet'>
          </div>
           <table v-props>
             <thead>
               <tr>
                 <th>総括</th>
                 <th colspan='3'>
                   連絡事項
                </th>
              </tr>
            </thead>
             <tbody>
               <tr>
                 <td>
                   <input type='text' v-model='dbTable.総括.名前'>
                </td>
                 <td colspan='3'>
                   <input type='text' v-model='dbTable.総括.連絡'>
                </td>
              </tr>
             </tbody>
           </table>
           <table v-props>
             <thead>
               <tr>
                 <th>お名前</th>
                 <th>担当階</th>
                 <th>リーダ</th>
                 <th>１５時</th>
              </tr>
            </thead>
             <tbody>
               <tr>
                 <td><input type='tel'  v-model='dbTable.担当.階数'>
                </td>
                 <td><input type='text' v-model='dbTable.担当.上司'>
                </td>
                 <td><input type='text' v-model='dbTable.担当.自分'>
                </td>
                 <td>
                   <div class='pretty p-icon p-curve p-jelly'>
                     <input type='checkbox' v-model='dbTable.担当.時短'>
                     <div class='state p-info'>
                       <i class='icon check'>
                      </i>
                       <label>
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
           <table v-props>
             <thead>
               <tr>
                 <th>日付</th>
                 <th>開始時刻</th>
                 <th>完了時刻</th>
                 <th>休憩時刻</th>
               </tr>
            </thead>
             <tbody>
               <tr>
                 <td><input type='tel' class='date-input' v-model='dbTable.就業.日付'></td>
                 <td><input type='tel' class='time-input' v-model='dbTable.就業.開始'></td>
                 <td><input type='tel' class='time-input' v-model='dbTable.就業.終了'></td>
                 <td><input type='tel' class='time-input' v-model='dbTable.就業.休憩'></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>
  </section>
</template>
 <script>
  module.exports = {
    directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('plan')
        }
      },
      'props':{
        inserted:function(el){
          el.classList.add('ui','attached','table','unstackable','center','aligned','celled','fixed')
        }
      }
    },
    model:{
      prop:'db',
      event:'input'
    },
    props:{
      db:Object,
      no:Number,
      detail:String,
      isShow:Boolean,
    },
    data:function(){
      return{
        sheet:'https://cataas.com/cat',
        sheetSize:null,
      }
    },
    computed:{
      dbImg:function(){
        return this.db.img
      },
      dbTable:function(){
        return this.db.table
      }
    },
    methods:{
      toggle:function(){
        this.isShow = !this.isShow
      },
      capture:function(event){
        var self = this
        new Compressor(event.target.files[0],{
          quality:0.6,
          success:function(result){
            self.dbImg.blob = result

            self.sheet = URL.createObjectURL(result)
            self.sheetSize = filesize(result.size,{round: 0})
          }
        })
      }
    },
    mounted:function(){
      _.forEach(this.$el.querySelectorAll('.date-input'),function(field){
        new Cleave(field, {
          date:true,
          datePattern:['m','d']
        })
      })
      _.forEach(this.$el.querySelectorAll('.time-input'),function(field){
        new Cleave(field, {
          time:true,
          timePattern:['h','m']
        })
      })
      new PinchZoom.default(this.$refs.sheetViewer,{
        tapZoomFactor:5,
        verticalPadding:100,
        horizontalPadding:100,
        draggableUnzoomed:true,
      })
    }
  }
</script>
 <style>
  .plan .ui.table thead th,
  .plan .ui.table tbody td{
    padding:0;
  }
  .plan .ui.table input{
    width:100%;
    border:none;
    text-align:center;
  }
  .plan .ui.table input:focus{
    outline:none;
  }
  .plan .ui.table .pretty{
    margin-right:0;
  }
  .plan input[capture]{
    display:none;
  }
  .plan .pinch-zoom-container{
    height: 159px !important;
  }
  .plan .ui.table{
    -webkit-box-shadow:none;
    -moz-box-shadow:none;
    box-shadow:none;
    border:none;
  }
  .plan .ui.card{
    overflow:hidden;
  }
  .plan .pinch-zoom-container{
  background-size: 14px 14px;
  background-image:
    linear-gradient(to right, rgba(229, 235, 237, 1) 1px,
    transparent 1px), linear-gradient(to bottom, rgba(229, 235, 237, 1) 1px, transparent 1px);
  }
</style>