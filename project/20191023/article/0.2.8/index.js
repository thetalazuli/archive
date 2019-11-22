Vue.component('keys',{
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
  mounted:function(){
    $(this.$el).tinyDraggable();
    $(this.$refs.labels).dropdown({
      allowAdditions:true,
      onRemove:function(name){

      },
      onAdd:function(name){
        
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
    documents:[
      {},
      {},
      {},
      {},
      {},
    ],
    pages:{
      
    }
  },
  methods:{
    
  },
  mounted:function(){
    $('.item',this.$refs.menu).tab({

    })
  }
})