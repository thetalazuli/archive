 <template>
  <table v-ui-data-table>
    <thead>
      <tr>
        <th
          v-for='col in keys'
          @click='sortBy(col)'>
            <i
              :class="['icon',col]"></i>
            <i
              v-if='col == sort.key'
              :class="['icon',sort.icon]"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for='row in orderedRows'
        :class="[rowClass(row),{selected:selectedRow == row}]"
        @click='selectBy(row)'>
          <td
            v-for='col in keys'
            v-if="typeof row[col] !== 'boolean'"
            v-text='row[col]'
            :class="[cellClass(col,row[col])]">
          <td
            v-else>
    <div class="pretty p-default">
        <input type="checkbox" v-model='row[col]'/>
        <div class="state p-primary">
            <label></label>
        </div>
    </div>
            </td>
      </tr>
    </tbody>
  </table>
</template>
 <script>
  module.exports = {
    directives:{
      'ui-data-table':{
        inserted:function(el){
          el.classList.add('component')
          el.classList.add('data-table')
          el.classList.add('ui','table','unstackable')
          el.classList.add('center','aligned','celled','very','basic')
        }
      }
    },
    props:{
      rows:{
        default:null,
        type:Object
      },
      keys:{
        default:null,
        type:Object
      },
      rowClass:{
        default:Function
      },
      cellClass:{
        default:Function
      }
    },
    data:function(){
      return {
        selectedRow:null,
        sort:{
          reverse:false,
          icon:null,
          key:null,
        }
      }
    },
    watch:{
      selectedRow:function(row,oldRow){
        this.$emit('selection-changed',row,oldRow)
      }
    },
    computed:{
      orderedRows:function(){
        var self=this
        return _.orderBy(this.rows,function(row){
          return row[self.sort.key] === null ? (self.sort.reverse ? -1045 : +1045) : row[self.sort.key]
        },self.sort.reverse ? 'desc' : 'asc')
      }
    },
    methods:{
      selectBy:function(row){
        this.selectedRow = row
      },
      sortBy:function(key){
        this.sort.reverse = !this.sort.reverse;
        this.sort.icon = this.sort.reverse ? 'sort-numeric-down' : 'sort-numeric-up'
        this.sort.key = key;
      }
    }
  }
</script>
 <style>
.data-table.ui i.icon.sort-numeric-up:before  {content:'\f163';}
.data-table.ui i.icon.sort-numeric-down:before{content:'\f162';}
.data-table.ui thead th,
.data-table.ui tbody td{
  padding:0;
}
.data-table.ui thead th{
  top:0;
  z-index:1;
  position:sticky;
  position: -webkit-sticky;
}
.data-table.ui thead th .icon{
  margin:0;
}
</style>