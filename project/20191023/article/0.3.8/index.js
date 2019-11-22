new Vue({
  el:'main',
  data:{
    articles:[
      {},
      {},
      {
        '20190919':{
          title:'hello world',
          content:''
        }
      }
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
    /* pages - 属性情報 */
    pages:{
      '20190919':{
         lock:true
      },
      '20190919':{},
      '20190919':{}
    }
  },
  methods:{
    init:function(){

    }
  },
  mounted:function(){

  }
})