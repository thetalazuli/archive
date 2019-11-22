 <template>
   <section v-ui>
     <header>
       <div class='pointing below no' @click='toggle' data-micron='bounce' v-sign>
         {{no}}
      </div>
       <label class='icon button' @click='save' v-sign>
         <i class='icon save'></i>
      </label>
       <span class='ui detail'>{{detail}}</span>
    </header>
     <article v-show='isShow'>
       <div v-controls>
         <div v-control>
           <table v-props>
             <tbody>
               <td><i class='icon 回収'></i></td>

               <td>0%</td>
               <td>0%</td>
               <td>0%</td>
               <td>0%</td>
               <td>0%</td>
               <td>0%</td>
                              <td>100%</td>
            </tbody>
          </table>
        </div>
         <div v-control>


           <table v-props>
             <thead>
               <tr>
                 <th>作業</th>

                 <th>自分</th>
                 <th><input type='text' placeholder='&#xf007;'></th>
                 <th><input type='text' placeholder='&#xf007;'></th>
                 <th><input type='text' placeholder='&#xf007;'></th>
                 <th><input type='text' placeholder='&#xf007;'></th>
                 <th><input type='text' placeholder='&#xf007;'></th>
                                  <th>合計</th>
              </tr>
            </thead>
             <tbody>
               <tr class=''>
                 <th class='selection'>


   <div class="pretty p-icon p-round p-jelly p-bigger">
        <input type="radio" name="icon" />
        <div class="state">
            <i class="icon 回収"></i>
            <label></label>
        </div>
    </div>


                 </th>
                 
                 <td v-text='dbList.回収'>

                 <div class="ui button">Show fluid popup</div>

                 </td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td></td>
              </tr>
               <tr>
                 <th>
                 
   <div class="pretty p-icon p-round p-jelly p-bigger">
        <input type="radio" name="icon" />
        <div class="state">
            <i class="icon 寝室"></i>
            <label></label>
        </div>
    </div>
                 
                 </th>
                 <td v-text='dbList.寝室'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td><td></td>
              </tr>
               <tr>
                 <th>
                 
   <div class="pretty p-icon p-round p-jelly p-bigger">
        <input type="radio" name="icon" />
        <div class="state">
            <i class="icon 浴室"></i>
            <label></label>
        </div>
    </div>
                 
                 </th>
                 <td v-text='dbList.浴室'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td><td></td>
              </tr>
               <tr>
                 <th>
                 
   <div class="pretty p-icon p-round p-jelly p-bigger">
        <input type="radio" name="icon" />
        <div class="state">
            <i class="icon 仕上"></i>
            <label></label>
        </div>
    </div>
                 </th>
                 <td v-text='dbList.仕上'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td><td></td>
              </tr>
               <tr>
                 <th>
                 
   <div class="pretty p-icon p-round p-jelly p-bigger">
        <input type="radio" name="icon" />
        <div class="state">
            <i class="icon 台車"></i>
            <label></label>
        </div>
    </div>
                 
                 </th>
                 <td v-text='dbList.台車'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td>
                 <td><input type='text'></td><td></td>
              </tr>
            </tbody>
          </table>

          
        </div>
       
         <div v-control>
           <div v-menu>
             <numeric-up-down
               v-for='key in _.keys(dbList)'
               v-model='dbList[key]'
               min=0
               max=128
              :name='key'
               action='increase'>
            </numeric-up-down>
          </div>
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
          el.classList.add('task')
        }
      },
      'menu':{
        inserted:function(el){
          el.classList.add('ui','menu','icon','five','item')
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
      dbList:function(){
        return this.db.list
      }
    },
    methods:{
      save:function(){
        this.$emit('save',this.dbList)
      },
      toggle:function(){
        this.isShow = !this.isShow
      }
    },
    mounted:function(){


    }
  }
</script>
 <style>
  .task .item.numeric-up-down input.label{
    background:transparent;
    color:black;
  }
  .task .menu{
    -webkit-box-shadow:none;
    -moz-box-shadow:none;
    box-shadow:none;
    border:none;
  }
  .task .ui.table thead th,
  .task .ui.table tbody td{
    padding:0;
  }
  .task .ui.table input{
    width:100%;
    border:none;
    text-align:center;
  }
  .task .ui.table input:focus{
    outline:none;
  }
  .task .ui.table .pretty{
    margin-right:0;
  }
  .task input[capture]{
    display:none;
  }
  .task .ui.table i.icon{
    margin:0;
  }
  .task .pretty.p-icon .state .icon{
    opacity:1;
  }

  .task input{
    background:transparent;
  }
  .task input{
    font-family:'Icons';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
.pretty.p-round.p-icon .state .icon {
    border-radius:0%;
   overflow:visible;
}
.pretty.p-icon .state .icon {
    border: none;
}
.pretty .state label:before,
.pretty .state label:after {
    border:none;
}
.pretty.p-round .state label:after, .pretty.p-round .state label:before {
    border:none;
}



</style>