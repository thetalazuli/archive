Vue.component('ar',{
  template:'#article',
  mounted:function(){

  }
})




new Vue({
  el:'main',
  data:{
    post:[

    ],
    article:[

    ]
  },
  methods:{
    new:function(){
      this.article.push({
        title:'',
        section:[

        ]
      })
    }
  },
  mounted:function(){
    var self = this
    /*
    $(this.$refs.tags).dropdown({
      allowAdditions:true,
      onLabelSelect:function(){

      },
      onRemove:function(removedValue,removedText,$removedChoice){
        self.$delete(self.post,removedValue)
      },
      onAdd:function(addedValue,addedText,$addedChoice){
        self.$set(self.post,addedValue,{
          title:'aaa'
        })



 



      }
    })
    */
  }
})