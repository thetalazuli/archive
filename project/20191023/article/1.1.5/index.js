Vue.use(VueAppend)
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
    foldGutter      : false,
    lineNumbers     : false,
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
    /*
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter'
    ]
     */
  }
})
Vue.component('indexes',{
  template:'#dropdown',
  props:['arr'],
  methods:{
    insert:function(name){
      this.$set(this.arr,name,{
        edit:false,
        content:''
      })
    },
    remove:function(name){
      this.$delete(this.arr,name)
    },
    select:function($dom){
      $(this.$refs.labels).dropdown('remove activeLabel')
      this.$set(this.$parent.archive,new Date().getTime(),{
        edit:false,
        name:$dom.dataset.value,
        content:this.arr[$dom.dataset.value].content
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
  },
  computed:{
    ui:function(){
      return ['ui dropdown selection multiple search labels'].join(' ')
    }
  }
})

new Vue({
  el:'main',
  mounted:function(){
    $(this.$refs.calendar)
    .calendar({
      type:'date',
      selectAdjacentDays:true,
      onSelect:function(date,mode){

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
  methods:{
    push:function(obj,name){
      this.$set(this.archive,name,{
        obj:obj,
        name:name,
      })
    }
  },
  data:{
    archive:{

    },
    pages:{

    }
  }
})