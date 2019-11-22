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
    key:'日記',
    edit:{
      color:'orange',
      title:'0.0.1',
      content:'',
      description:'小さなノートの開発'
    },
    pages:[

    ]
  },
  computed:{
    editor:function(){
      return this.$refs.editor.codemirror
    }
  },
  methods:{
    open:function(index,doc){
      this.edit = doc
    },
    push:function(){
      this.pages.push(Object.assign({},this.edit))
    },
    selectAll: function() {
      CodeMirror.commands["selectAll"](this.editor);
    },
    autoFormat: function() {
      this.editor.setCursor(0,0);
      this.selectAll();
      this.editor.autoFormatRange(this.editor.getCursor(true), this.editor.getCursor(false));
      this.editor.setCursor(0,0);
    },
    binding:function(event){
      this.content = this.$refs.editable.innerHTML
      var self = this
      this.$nextTick(function(){
        self.autoFormat()
      })
    },
    load:function(){
      if(localStorage[this.key]){
        var cache = JSON.parse(localStorage[this.key])
        Object.assign(this.$data,cache)
      }
    },
    save:function(){
      localStorage[this.key] = JSON.stringify(this.$data)
    }
  },
  created:function(){
    this.load()
  },
  mounted:function(){
    var self = this
    $('select.dropdown').dropdown({
      onChange:function(value){
        self.edit.color = value
      }
    })
    this.autoFormat()
  }
})