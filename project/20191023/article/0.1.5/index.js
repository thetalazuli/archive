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
Vue.use(SemanticUIVue)
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
    content:'',
    colors:[
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
    prs:'edit',
    index:0,
    archive:[

    ],
    stars:[

    ],
    pages:{

    }
  },
  methods:{
    exec:function(doc,i){
      if (this.prs == 'edit')
        doc.edit = !doc.edit
      if (this.prs == 'trash')
        this.archive.splice(i,1)
      if (this.prs == 'star')
        this.stars.push(doc)
    },
    change:function(i){
      this.prs = i
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
    $('.item',this.$refs.tab1)
    .tab({
      context:'#ta'
    })
  ;
  $('.item',this.$refs.tab2)
  .tab({
    context:'#tb'
  })
;


$('.accordion')
  .accordion({
    selector: {
      trigger: '.title'
    }
  })
;

    $('.item',this.$refs.tab1).popup({
      on:'click',
      closable:false,
      position:'left center',
    })
    var self = this
    $('.ui.selection.dropdown')
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