Vue.component('container',{
  template:'#container',
  data:{
    articles:[

    ],
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
  computed:{
    theme:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  mounted:function(){
    var self = this
    $(this.$refs.dropdown).dropdown({
      allowAdditions:true,
      onRemove:function(value){
        var i = self.articles.findIndex(function(v){
          return v.title == value
        })
        self.articles.splice(i,1)
      },
      onAdd:function(value){
        self.articles.push({
          title:value
        })
      }
    })
  }
})

new Vue({
  el:'main'
})