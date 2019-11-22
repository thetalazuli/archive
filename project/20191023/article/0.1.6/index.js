Vue.use(VueInputAutowidth)

Vue.directive('test',{
  inserted:function(el,binding){
    console.dir(el)
    el.onkeydown = function(){
      console.dir(el)
    }
  },
  update:function(el,binding){
    console.dir(el)
  }
})


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

Vue.component('doc',{
  template:'#doc',
  props:['v','mode'],
  data:function(){
    return {
      stacked:false,
      loading:false,
      piled:false
    }
  },

  computed:{
    hasedit:function(){
      var x = _.every(this.v.section, function(item) {
        return !item.edit
      })
      console.dir(x)
      return x
    },
    classObject:function(){
      return [
        {'stacked':this.stacked},
        {'loading':this.loading},
        {'piled':this.piled},
      ]
    }
  },
  methods:{
    add:function(doc){
      if(this.mode == 'edit'){
  
        doc.edit = !doc.edit
        this.$parent.current = doc       
      }
      if (this.mode =='trash'){
        
      }
      if(this.mode == 'star')
        this.$emit('addfav',doc)
    }
  },
  mounted:function(){
    var self = this
    

    $(this.$refs.tags).dropdown({
      allowAdditions:true,
      onRemove:function(removedValue,removedText,$removedChoice){
        self.$delete(self.v.section,removedValue)
      },
      onAdd:function(addedValue,addedText,$addedChoice){
        self.$set(self.v.section,addedValue,{
          content:'hello',
          edit:false
        })
      }
    })

    _.each(_.keys(this.v.section),function(i){
      $(self.$refs.tags).dropdown('set selected',i)
      console.dir(i)
    })

  

  }
})

new Vue({
  el:'main',
  data:{
    mode:'edit',
    cnt:'dfslkdfs',
    current:null,
    data:{
      cnt:0,
      title:'下書',
      edit:false,
      expand:false,
      section:{

      }
    },
    favorite:[

    ],
    articles:[

    ]
  },
  methods:{
    add:function(doc){
      this.favorite.push(doc)
    },
    push:function(){
      this.data.cnt = this.cnt++
      this.articles.push(_.cloneDeep(this.data))


    }
  },
  mounted:function(){
    $('.item',this.$refs.tab).tab({

    })
  }
})