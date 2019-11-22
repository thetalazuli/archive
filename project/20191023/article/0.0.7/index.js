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
    autofocus       : true,
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
  model:{
    prop:'doc',
    event:'input'
  },
  props:{
    doc:{
      type:Object,
      default:null
    }
  },
  template:'#document',
})

new Vue({
  el:'main',
  data:{
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
    index:0,
    archive:[

    ],
    pages:{

    }
  },
  methods:{
    remove:function(i){

      this.archive.splice(i,1)
    },
    push:function(){
      var self = this
      Object.keys(this.pages).forEach(function(key) {
        self.archive.push(self.pages[key])
      });

      this.pages = {}
    }
  },
  mounted:function(){
    var self = this
    $('.ui.dropdown')
    .dropdown({
      allowAdditions: true,
      onRemove:function(text){
        self.$delete(self.pages,text)
        self.index--
      },
      onAdd:function(val,text){
        self.$set(self.pages,text,{
          color:self.colors[self.index++],
          step:self.index,
          title:text,
          content:'',
          edit:false,
          description:''
        })
      },
      onLabelSelect:function(label){
        console.dir(label)
      }
    })
  }
})