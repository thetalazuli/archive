

Vue.use(VueLoader)
Vue.mixin({
  directives:{
    ui:{
      inserted:function(el,binding,vnode){
        el.classList.add(vnode.context.$options.name)
      },
      update:function(el,binding,vnode){
        el.classList.add(vnode.context.$options.name)
      }
    }
  },
  components:{
    'E-記事の表示と編集':'url:application/ui-segment/E-記事の表示と編集.vue',
  },
  data:function(){
    return{
      show:true,
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
       ]
    }
  },
  filters:{
    MMDD:function(timestamp){
      return moment(timestamp,'x').format('MM/DD')
    }
  },
  computed:{
    store:function(){
      return this.$root.core
    }
  },
  methods:{
    getShow:function(){
      return this.show
    },
    toggle:function(){
      this.show = !this.show
    },
    pickupPage:function(){
    },
    removePage:function(ctime){
      var day = moment(ctime,'x').set({h:0,m:0,s:0,ms:0}).valueOf()
      var name = this.store.pages[ctime].tag

      this.$delete(this.store.calendar[day].keys,ctime)
      this.$delete(this.store.labels[name],ctime)
      this.$delete(this.store.pages,ctime)
    },
    insertPage:function(draft,schedule){
      var now = moment().valueOf()
      var day =  moment().set({h:0,m:0,s:0,ms:0}).valueOf()
      var draft = _.clone(draft,true)
      
      _.assign(draft,{
        editing:false,
        schedule:schedule || day
      })

      draft.editing = false

      if(_.has(this.store.calendar,day) == false){
        this.$set(this.store.calendar,day,{
          favorite:null,
          show:false,
          keys:{}
        })
      }

      if(schedule){
        
        if(_.has(this.store.calendar,schedule) == false){
          this.$set(this.store.calendar,schedule,{
            favorite:null,
            show:false,
            keys:{}
          })
        }
        this.$set(this.store.calendar[schedule].keys,now,{})

      } 
      if(_.has(this.store.labels,draft.tag) == false)
        this.$set(this.store.labels,draft.tag,{})

      this.$set(this.store.pages,now,draft)
      this.$set(this.store.labels[draft.tag],now,{})
      this.$set(this.store.calendar[day].keys,now,{})

    }
  },
})

new Vue({
  el:'main',
  components:{
    /*
     * 起動
     */
    'E-初期化':'url:application/ui-boot/E-初期化.vue',

     /*
      * ページ
      */
    'E-記事一覧を日付毎に表示':'url:application/ui-segments/E-記事一覧を日付毎に表示.vue',
    'E-記事一覧をタグ毎に表示':'url:application/ui-segments/E-記事一覧をタグ毎に表示.vue',
    'E-記事一覧をファイル毎に表示':'url:application/ui-segments/E-記事一覧をファイル毎に表示.vue',
    'E-記事一覧の最近の10件を表示':'url:application/ui-segments/E-記事一覧の最近の10件を表示.vue',
    'E-自己紹介を表示':'url:application/ui-segments/E-自己紹介を表示.vue',

    /*
     * コントローラ
     */
    'E-記事の作成':'url:application/ui-menu/E-記事の作成.vue',
    'E-ファイルの登録':'url:application/ui-menu/E-ファイルの登録.vue',
    'E-カレンダの日付の指定':'url:application/ui-menu/E-カレンダの日付の指定.vue'
  },
  data:{
    inited:false,
    day:0,
    step:15,
    width:148,
    draft:{
      tag:'',
      html:'',
      color:'',
      fitted:false,
      editing:false,
      schedule:null
    },
    recently:10,
    drafts:{

    },
    files:[

    ],
    core:{
      calendar:{

      },
      labels:{
  
      },
      pages:{
  
      }
    }
  },
  computed:{
    days:function(){
      return moment(this.day,'x').nextNDays(15,'x')
    }
  },
  methods:{
    next:function(){
      this.day = moment(this.day,'x').add(this.step,'days').valueOf()
      console.dir(this.day)
      console.dir(this.step)
    },
    prev:function(){
      this.day = moment(this.day,'x').subtract(this.step,'days').valueOf()
    },
    init:function(){

      this.inited = true

      this.day = moment().valueOf()



      Vue.use(VueDatGui)
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
      var self = this
      this.$nextTick(function(){
       self.construct()
      })

    },

    navigate:function(){
      $(this.$refs.navigation).shape('flip up')
      $(this.$refs.fff).shape('flip over')




    },
    construct:function(){
      $(this.$refs.btnEdit).popup({
        on:'click',
        closable:false,
        position:'top right',
     })
      
      $('.item',this.$refs.menu).tab({

      })   
         $(this.$refs.fff).shape({
        duration:200
      })
      $(this.$refs.navigation).shape({
        duration:200
      })
    }
  },
  mounted:function(){
    console.log('initmounte')
    if(this.inited){
      this.construct()
    }
    console.dir(
      this.$refs
    )
  }
})