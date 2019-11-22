
Vue.use(window['vue-moment-lib'])
Vue.use(VueCodeMirror,{
  options:{
    scrollbarStyle  : 'simple',
    theme           : 'default',
    mode            : 'htmlmixed',
    firstLineNumber : 1,
    tabSize         : 2,
    indentUnit      : 2,
    matchTags       : {bothTags: true},
    htmlMode        : true,
    autoCloseTags   : true,
    foldGutter      : true,
    lineNumbers     : true,
    lineWrapping    : true,
    extraKeys: {
      'Ctrl-A': 'autocomplete',
      'Ctrl-Q': function(cm){
        cm.foldCode(cm.getCursor())
      },
      'F11': function(cm){
        cm.setOption("fullScreen", !cm.getOption("fullScreen"))
      }
    },
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter'
    ]
  }
})
Vue.component('indexes',{
  template:'#dropdown',
  props:['arr'],
  methods:{
    insert:function(name){
    },
    remove:function(name){
    },
    select:function($dom){
      $(this.$refs.labels).dropdown('remove activeLabel')
      this.$set(this.arr,moment().valueOf(),{
        tag:$dom.dataset.value,
        content:''
      })
    }
  },
  mounted:function(){
   var self = this
    $(this.$refs.labels).dropdown({
      allowAdditions :true,
      onLabelSelect  :self.select,
      onRemove       :self.remove,
      onAdd          :self.insert,
    })
/*
    for(item in this.arr){
      $(this.$refs.labels).dropdown('add label',item,item)
    }
 */
  },
  computed:{
    ui:function(){
      return ['ui dropdown selection multiple search labels'].join(' ')
    }
  }
})
new Vue({
  mounted:function(){
    var self = this

    $(this.$refs.calendar)
    .calendar({
      type:'date',
      selectAdjacentDays:true,
      onSelect:function(date,mode){
        self.archive = new moment(date).nextNDays(7,'x')
      },
      formatter:{
        dayHeader:function(date,settings){
          return date.getFullYear()+'年'+settings.text.months[date.getMonth()]+'月'
        },
        date:function(date,settings){
          return date?date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate():''
        }
      },
      popupOptions: {
        position    :'bottom right'
      },
      text:{
        days        :['日','月','火','水','木','金','日'],
        months      :['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthsShort :['1','2','3','4','5','6','7','8','9','10','11','12'],
        today       :'本日',
        now         :'現在',
        am          :'午前',
        pm          :'午後'
      }
    })
  },
  data:{
    content:'',
    archive:[

    ],
    pages:{

    }
  },
  el:'main'
})