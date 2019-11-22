
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

new Vue({
  el:'main',
  data:{
    fav:{

    },
    mode:'',
    edit:null,
    labels:{

    }
  },
  methods:{
    init:function(){
      var self = this
      $(this.$refs.labels).dropdown({
        allowAdditions:true,
        onLabelSelect:function(dom){
          var key = dom.dataset.value
          if (self.mode == 'star'){
            self.$set(self.fav,key,{
              content:'',
              title:key
            })
          }else{
            self.edit = self.edit != key ? key : null
          }

        },
        onRemove:function(key){
          self.$delete(self.labels,key)
        },
        onAdd:function(key){
          self.$set(self.labels,key,{
            content:'',
            title:key
          })
        }
      })
    }
  },
  mounted:function(){
    this.init()
  }
})