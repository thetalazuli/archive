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
    }
  }
})
Vue.component('create-draft',{
  template:'#dropdown',
  props:['data'],
  data:function(){
    return{
      refills:{
      }
    }
  },
  watch:{
    deep:true,
    refills:{
      handler:function(obj){
        var arr = []
        _.keys(obj).forEach(function(v){
          arr.push({
            name:v,
            value:v
          })
        })
        
        $(this.$refs.labels).dropdown('setup menu',{
          values:arr
        })
      }
    }
  },
  methods:{
    addRefills:function(obj){
      this.refills = obj
      
      var arr = []
      _.keys(obj).forEach(function(v){
        arr.push({
          name:v,
          value:v
        })
      })
      $(this.$refs.labels).dropdown('setup menu',{
        values:arr
      })
    },
    addLabels:function(arr){
      var self = this
      arr.forEach(function(tag){
        $(self.$refs.labels).dropdown('add label',tag,tag)
      })
    },
    insert:function(tag){
      this.$set(this.data,tag,{
        uid:shortId.generate(),
        editing:false,
        name:tag,
        html:''
      })
      if(tag in this.refills){
        // template engine {{uuid - mount jquery plugin}}
        
        var template = Handlebars.compile(this.refills[tag].html)
        var data = {
          uuid:this.data[tag].uid
        }
        this.data[tag].html = template(data);
      }
    },
    remove:function(tag){
      this.$delete(this.data,tag)
    },
    select:function($dom){
      $(this.$refs.labels).dropdown('remove activeLabel')
      this.$emit('select',this.data[$dom.dataset.value])
    }
  },
  mounted:function(){
   var self = this
    $(this.$refs.labels).dropdown({
    　allowAdditions :true,
      label:{
        transition     :'browse',
      },
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

Vue.component('document',{
  template:'#document',
  props:['color','content','title','uid'],
  methods:{

  }
})

Vue.component('draft',{
  template:'#draft',
  props:['color','data','title','uid'],
  methods:{

  }
})

var path = new VueRouter({
  routes:[
    {
      path:'/trash'
    }
  ]
})

new Vue({
  el:'main',
  data:{
    range:7,
    tagIndexes:{
      
    },
    dateIndexes:{

    },
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
    drafts:{

    },
    favorites:{

    },
    documents:{

    },
    pages:{

    }
  },
  watch:{
    '$data':{
      deep:true,
      handler:function(val){
        _.debounce(function () {
          localforage.setItem('walk',val)
        }, 1000)()
      }
    }
  },
  computed:{
    emptyDraft:function(){
      return _.keys(this.drafts).length == 0
    },
    prevNDay:function(){
      return moment().subtract(this.range - 1, 'days')
    },
    mode:function(){
      return this.$route.path.slice(1)
    }
  },
  methods:{
    favoriteDraft:function(name){
      if(name in this.favorites) {
        this.$delete(this.favorites,name)
      } else{
        this.$set(this.favorites,name,_.clone(this.drafts[name],true))
      }
    },
    clickDocument:function(createdAt){
      switch(this.mode){
        case 'edit':
          this.pages[createdAt].editing = !this.pages[createdAt].editing
          break;
        case 'trash':

          var index = moment(createdAt,'x').set({h:0,m:0,s:0,ms:0}).format('x')
          var name = this.pages[createdAt].name
          this.$delete(this.tagIndexes[name].list,createdAt)
          console.dir(_.keys(this.tagIndexes[name]).length)
          if(_.keys(this.tagIndexes[name].list).length == 0){
            this.$delete(this.tagIndexes,name)
          }
          this.$delete(this.documents[index],createdAt)
          this.$delete(this.pages,createdAt)
          if(_.keys(this.documents[index]).length == 0){
            this.$delete(this.documents,index)
          }
          break;
      }
    },
    createDateIndex:function(date){
      var self = this
      var arr = moment(date).nextNDays(this.range,'x')
      self.dateIndexes = {}
      arr.forEach(function(v){
        self.$set(self.dateIndexes,v,{
          expand:false
        })
      })
    },
    createTagIndex:function(name,pageIndex){
      if(!(name in this.tagIndexes)){
        this.$set(this.tagIndexes,name,{
          expand:false,
          list:{

          }
        })
      }
        this.$set(this.tagIndexes[name].list,pageIndex,{})
    },
    createDocument:function(draft){
      //var index = new moment({year:2019,month:9-1,day:20,hour:0,minute:0,seconds:0,millisecond:0}).format('x')
      //var createdAt = new moment({year:2019,month:9-1,day:20,hour:0,minute:0,seconds:0,millisecond:0}).format('x')

     var index = new moment({h:0,m:0,s:0,ms:0}).format('x')
     var createdAt = new moment().valueOf()
      if(!(index in this.documents)){
        this.$set(this.documents,index,{})
      }
      
      this.createTagIndex(draft.name,createdAt)
      
      var data = _.clone(draft,true)
          data.editing = false
      this.$set(this.documents[index],createdAt,{
      })
      this.$set(this.pages,createdAt,data)
    },
    init:function(){
      this.createDateIndex(this.prevNDay)
    },
    construct:function(){
      var self = this
      $(this.$refs.calendar)
      .calendar({
        type:'date',
        selectAdjacentDays:true,
        onSelect:function(date,mode){
          self.createDateIndex(date)
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
      $(this.$refs.calendar).calendar('set date',this.prevNDay.format('YYYY-MM-DD'))
    }
  },
  router:path,
  created:function(){
    shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_')
  },
  mounted:function(){
    var self = this
    localforage.getItem('walk', function(err,data) {
      if(data != null) {
        self.tagIndexes = data.tagIndexes
        self.documents = data.documents
        self.favorites = data.favorites
        self.drafts = data.drafts
        self.pages = data.pages
        /*
        for(var i=0; i<7;i++){
          self.$set(self.documents,new moment({year:2019,month:9-1,day:20-i,hour:0,minute:0,seconds:0,millisecond:0}).format('x'),{})
        }
        */
      }
      self.$nextTick(function(){
        self.$refs.createDraft.addRefills(self.favorites)
        self.$refs.createDraft.addLabels(_.keys(self.drafts))
      })
      self.construct()
      self.init()
    })

  }
})