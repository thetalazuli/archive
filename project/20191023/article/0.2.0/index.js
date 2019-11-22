Vue.component('document',{
  template:'#document',
})

Vue.component('dropdown',{
  template:'#dropdown',
  props:{
    data:{
      type:Object
    },
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
    theme:function(){
      return ['ui dropdown selection multiple search','labels',this.color].join(' ')
    }
  },
  mounted:function(){
    var self = this
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
  }
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
    lines:[
      {},
      {},
      {},
    ]
  },
  mounted:function(){
    
  }
})