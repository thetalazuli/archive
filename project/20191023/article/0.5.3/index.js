

Vue.component('page',{
  template:'#page',
  props:{
    data:{
      default:null,
      type:Object
    },
    color:{
      default:'',
      type:String
    }
  }
})

Vue.component('indexes',{
  template:'#dropdown',
  props:{
    articles:{
      default:null,
      type:Object
    },
    template:{
      default:null,
      type:Object
    },
    color:{
      default:'',
      type:String
    },
    source:{
      default:null,
      type:Object
    }
  },
  computed:{
    ui:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  methods:{
    getTime:function(){
      return new Date().getTime()
    },
    select:function(name){
      var info = this.articles[name]
      this.$emit('select',info)
    },
    remove:function(name){
      var idx = this.articles[name].idx
      this.$delete(this.source,idx)
      this.$delete(this.articles,name)
    },
    add:function(name){
      var key = this.getTime()
      this.$set(this.source,
          key,
          _.assign({},this.template.page,{
            title:name
          })
      )
      this.$set(this.articles,
        name,
        _.assign({},this.template.article,{
          idx:key,
          lock:false
       })
      )
    }
  },
  mounted:function(){
    var self = this
    $(this.$refs.labels).dropdown({
      allowAdditions:true,
      onLabelSelect:function(dom){
        $(self.$refs.labels).dropdown('remove activeLabel')
        self.select(dom.dataset.value)
      },
      onRemove:self.remove,
      onAdd:self.add
    })

    for(k in this.articles){
      $(this.$refs.labels).dropdown('add label',k,k)
    }
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

new Vue({
  el:'main',
  created:function(){
    this.load()
  },
  methods:{
    load:function(){
      var self = this
      localforage.getItem('data', function(err,obj) {
       
        if(!obj){
          self.stat.loadedStorage = true
          return 
        }
        self.user = obj
        self.stat.loadedStorage = true
      })
    },
    save:function(){
      localforage.setItem('data',this.user)
    },
    nextView:function(){
      this.tab = (this.tab + 1) % this.views.length
    },
    exitPage:function(){
      this.edit.lock = false
      this.edit = null
    },
    editPage:function(info){
      if (
        this.edit == null ||
        this.edit.idx != info.idx) {
          this.edit = info
          this.edit.lock = true
      } else {
        this.edit.idx = null
      }
    }
  },
  watch:{
    'user':{
      deep:true,
      handler:function(obj){
        var self = this
        _.debounce(function(){
          self.save()
        },1000)
        ()
      }
    }
  },
  computed:{
    isViewIndexes:function(){
      return this.views[this.tab].name == 'indexes'
    },
    isEditing:function(){
      return this.edit != null
    }
  },
  data:{
    edit:null,
    tab:0,
    views:[
      {
        name:'indexes',
        icon:'list',
      },
      {
        name:'refill',
        icon:'clone'
      }
    ],
    stat:{
      loadedStorage:false
    },
    master:{
      edit:{
        idx:null,
        lock:false
      },
      article:{
        idx:'',
        lock:false
      },
      page:{
        title:'',
        content:''
      }
    },
    user:{
      articles:{
        'grey'   :{},
        'brown'  :{},
        'pink'   :{},
        'purple' :{},
        'violet' :{},
        'blue'   :{},
        'teal'   :{},
        'green'  :{},
        'olive'  :{},
        'yellow' :{},
        'orange' :{},
        'red'    :{}
      },
      pages:{
        
      }
    }
  }
})