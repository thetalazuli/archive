Vue.component('loader',{
  template:'#file',
  props:{
    title:{
      type:String,
      default:'Untitled'
    }
  },
  data:function(){
    return{
     blob:null,
     blobURL:'',
     quality: 0.3,
     convertedSize:0
    }
  },
  created:function(){
    var self = this
    localforage.getItem('cover',function(err,obj){
      if(!obj){
        return
      }
      console.dir(obj)
      obj.blobURL = URL.createObjectURL(obj.blob)
      Object.assign(self.$data,obj)
    })
  },
  watch:{
    'blobURL':{
      handler:function(val){
        localforage.setItem('cover',this.$data)
      }
    }
  },
  methods:{
     set:function(blob){
       this.blob = blob
       this.blobURL = URL.createObjectURL(blob)
       this.convertedSize = filesize(blob.size, {round: 0})
       this.$emit('uploaded',this.blobURL)
     },
     createFile:function(file){
       var self = this

       new Compressor(file, {
       quality: self.quality,
       mimeType: 'image/jpeg',
       success(result) {

         console.dir(result)
         console.dir(typeof result)
         console.dir(URL.createObjectURL(result))
         console.dir(filesize(result.size, {round: 0}))

         self.set(result)
       },
       error(err) {
         console.log(err.message);
       },
     })
    },
    onChange:function(e){
      var files = e.target.files;
      this.createFile(files[0]);
    },
    onDrop:function(e){
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    }
  }
})

Vue.use(VueAutoSize)

new Vue({
  el:'main',
  data:{
    title:'hello',
    description:'sss',
    content:'',
    master:{
      section:{
        comment:'hello world',
        createdAt:'1991/09/91',
        content:''
      },
      article:{
        title:'',
        sections:{

        }
      }
     },
     articles:{
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
     pages:{

     }


  },
  mounted:function(){
    var self = this
    this.colors.forEach(function(v,i){
      self.$set(self.articles,v,{})
    })
  },
  methods:{
    done:function(src){
      console.dir(src)
    }
  }
})

Vue.component('indexes',{
  template:'#dropdown',
  props:['article','color','template'],
  computed:{
    ui:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
   methods:{
     loadLabels:function(){
       for(k in this.article){
       $(this.$refs.labels).dropdown('add label',k,k)
       }
     },
     getTime:function(){
       return new Date().getTime()
     },
     select:function(name){
       var info = this.article[name]
       this.$emit('select',info)
     },
     remove:function(name){
       this.$delete(this.article,name)
     },
     add:function(name){
       var key = this.getTime()
       this.$set(this.article,
         name,
         _.assign({},this.template,{
           title:name,
           createdAt:key
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