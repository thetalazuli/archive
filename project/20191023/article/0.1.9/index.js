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
  template:'#document',
  props:{
    page:{
      type:Object
    }
  }
})

Vue.component('dropdown',{
  template:'#dropdown',
  props:{
    color:{
      type:String,
      default:'black'
    }
  },
  data:function(){
    return{
      labels:[

      ]
    }
  },
  computed:{
    hasLabels:function(){
      return this.labels.length != 0
    },
    theme:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  mounted:function(){
    var self = this

    $('.item',this.$refs.menu).tab({

    })
    $(this.$refs.dropdown).dropdown({
      allowAdditions:true,
      onRemove:function(value){
        var i = self.labels.findIndex(function(v){
          return v.title == value
        })
        self.labels.splice(i,1)
      },
      onAdd:function(value){
        self.labels.push({
          title:value
        })
      }
    })
    // 報告連絡相談とか
    // あみだくじを横にみろ
    // 一番上はgrey(現実なら法とか、会社なら報告連絡相談とか)
    // 継続的な線を書け
    // まとめノートはあみだくじの交わる線だ（横のあみだくじなら上下を結ぶ線）
    // やれ just do it!!
  }
})

new Vue({
  el:'main',
  data:{
    content:'',
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
    lines:[
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
      {},
    ]
  },
  mounted:function(){
    
  }
})