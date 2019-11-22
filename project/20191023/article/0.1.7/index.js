

Vue.component('page',{
  template:'#page',
  props:{
    colors:{
      type:Array
    },
    data:{
      default:null
    }
  },
  data:function(){
    return{
      expand:false
    }
  },
  mounted:function(){
    var self = this
    $(this.$refs.tags).dropdown({
      allowAdditions:true,
      onRemove:function(removedValue,removedText,$removedChoice){
        var i = self.data.children.findIndex(function(v){
          return v.text == removedValue
        })
        self.data.children.splice(i,1)
      },
      onAdd:function(addedValue,addedText,$addedChoice){

        self.data.children.push({
          depth:self.data.depth + 1,
          text:addedValue,
          children:[]
        })

      }
    })
  }
})
new Vue({
  el:'main',
  components:{
    jstree:window['vue-jstree']
  },
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
    currentnode:null,
    pages:[
      {
        depth:0,
        text:'user-1',
        children:[
          {
            depth:1,
            text:'TEXT-2'
          }
        ]
      }
    ]
  },
  methods:{
    push:function(){
      this.pages.push({
        text:'title',
        depth:0,
        opened:true,
        children:[

        ]
      })
    },
    itemClick:function(node){
      var self = this
      this.currentnode = node


      $(this.$refs.tags).dropdown({
        allowAdditions:true,
        onRemove:function(removedValue,removedText,$removedChoice){
          var i = self.currentnode.data.children.findIndex(function(v){
            return v.text == removedValue
          })
          self.currentnode.data.children.splice(i,1)
        },
        onAdd:function(addedValue,addedText,$addedChoice){
  
          self.currentnode.data.children.push({
            text:addedValue,
            depth:0,
            opened:true,
            children:[
    
            ]
          })
  
        }
      })


      _.each(this.currentnode.data.children,function(i){
        $(self.$refs.tags).dropdown('set selected',i.text)
        console.dir(i.text)
      })



    }
  },
  mounted:function(){
    var self = this


    $(this.$refs.tags).dropdown({
      allowAdditions:true,
      onRemove:function(removedValue,removedText,$removedChoice){
        var i = self.currentnode.data.children.findIndex(function(v){
          return v.text == removedValue
        })
        self.currentnode.data.children.splice(i,1)
      },
      onAdd:function(addedValue,addedText,$addedChoice){

        self.currentnode.data.children.push({
          text:addedValue,
          depth:0,
          opened:true,
          children:[
  
          ]
        })

      }
    })

    /*
    $(this.$refs.tags).dropdown({
      allowAdditions:true,
      onRemove:function(removedValue,removedText,$removedChoice){
        var i = self.pages.findIndex(function(v){
          return v.text == removedValue
        })
        self.pages.splice(i,1)
      },
      onAdd:function(addedValue,addedText,$addedChoice){

        self.pages.push({
          text:addedValue,
          depth:0,
          opened:true,
          children:[
  
          ]
        })

      }
    })

*/
  }
})