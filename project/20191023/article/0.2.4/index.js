
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


Vue.component('document',{
  props:['data','color'],
  template:'#document',

})
Vue.component('labels',{
  props:['data','color'],
  template:'#dropdown',
  data:function(){
    edit:''
  },
  computed:{
    theme:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  mounted:function(){
    var self = this
    $(this.$refs.labels).dropdown({
      allowAdditions:true,
      onLabelSelect:function(dom){
        var key = dom.dataset.value
        self.$emit('labelselect',self.data[key])
        return false
      },
      onRemove:function(name){
        self.$delete(self.data,name)
      },
      onAdd:function(name){
        self.$set(self.data,name,{
          title:name,
          content:''
        })
      }
    })
  }
})

new Vue({
  el:'main',
  data:{
    editing:null,
    colors:[
      'grey',
      'brown',
      'pink',
      'purple',
      'violet',
      'blue',
      'teal',
      'green',
      'olive',
      'yellow',
      'orange',
      'red'
    ],
    labels:[
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ]
  },
  methods:{
    clearEditing:function(){
      this.editing = null
    },
    labelselect:function(v){
      if (this.editing != null)
        this.editing = this.editing.title != v.title ? v : null
      else
        this.editing = v
    }
  },
  mounted:function(){

  }
})