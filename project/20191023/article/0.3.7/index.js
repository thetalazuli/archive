Vue.component('labels',{
  template:'#keys',
  props:{
    color:{
      default:'',
      type:String
    }
  },
  computed:{
    struct:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  methods:{
    remove:function(name){
      var key = this.keys[name]
      this.$emit('remove',key,name)
      this.$delete(this.keys,name)
    },
    add:function(name){
      var key = this.at()
      this.$set(this.keys,name,key)
      this.$emit('add',key,name)
    },
    at:function(){
      return new Date().getTime()
    }
  },
  data:function(){
    return{
      keys:{
      }
    }
  },
  mounted:function(){
    var self=this
    $(this.$refs.labels).dropdown({
      allowAdditions:true,
      onRemove:self.remove,
      onAdd:self.add
    })
  }
})


new Vue({
  el:'main',
  data:{
    articles:[

    ],
    colors:[
      'black',
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
  methods:{
    init:function(){
      var self=this
      this.colors.forEach(function(v,n){
        self.articles.push([])
      })
    },
    page:function(title){
      return Object.assign({},{
        title:title
      })
    },
    removePage:function(created_at,title){
      this.$delete(this.pages,created_at)
    },
    addPage:function(created_at,title){
      this.$set(this.pages,created_at,this.page(title))
      
    }
  },
  created:function(){
    this.init()
  },
  mounted:function(){
    $('.item',this.$refs.menu).tab({

    })
  }
})