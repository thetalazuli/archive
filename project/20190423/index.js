'use strict';

document.ui =
{
  el:'.view-component',
  controller:{
    animate:function(el){
      $(el).addClass('animated zoomIn fast')
    },
  },
  ready:function(){
    this.controller.animate(this.el)
  }
}

/*
 * 全てのリソースの読み込みが終わったら開始
 */
window.addEventListener('load',function(){

  Vue.use(VueGun)
  Vue.use(VueLoader)
  Vue.use(VueCookies)

  new Vue({
    el:'main',
    components:{
      'total':'url:js/component/gadget/total.vue',
      'data-table':'url:js/component/form/data-table.vue',
      'numeric-up-down':'url:js/component/form/numeric-up-down.vue',
    },
    data:{
      $share:null,        /* GUN-DB:シェア一覧 */
      $users:null,        /* GUN-DB:ユーザ一覧 */
      $uid:null,          /* GUN-DB:ユーザ一覧から自身を識別するID */
      userRows:[],        /* GUN-DB:取得した全ユーザのデータを配列化したもの */
      viewKeys:[          /* GUN-DB:取得した全ユーザのデータから表示する項目を纏めたもの */
        'name',
        'floor',
        'bed',
        'bath',
        'check'
      ],
      user:{
        id:null,          /* 作業者の識別ID */
        name:'・ω・',      /* 作業者のお名前 */
        floor:0,          /* 作業者の担当階 */
        bed:null,         /* 作業者の部屋数（ベッドメイク）*/
        bath:null,        /* 作業者の部屋数（バスルームの洗浄）*/
        check:null        /* 作業者の部屋数（作業完了した部屋の確認）*/
      },
      info:{
        text:''           /* 作業者の全員が共有する内容（朝礼の時の伝達事項など） */
      }
    },
    methods:{
      /*
       * DATA-TABLE用
       */
      setRowClass:function(user){
        return {
          me:user.id == this.$uid
        }
      },
      setCellClass:function(key,userValue){
        return {
          zero:userValue == 0
        }
      },
      /*
       * 初期化
       */
      init:function(){
        this.$uid = this.$cookies.get('_ga')
        this.$share = this.$gun.get('share')
        this.$users = this.$gun.get('users')
      },
      /*
       * 準備（GUN-DB）
       */
      setup:function(){
        var self = this
        
        /* 全ユーザから自分を識別する為に */
        this.user.id = this.$uid
        /* 全ユーザのデータを取得するだけ */
        this.$users.open(function(data){
          self.userRows = _.filter(data)
        })
        /* ウェブブラウザから離れたら消去 */
        this.$users.get(this.$uid).bye().put(null)
        /* ユーザ全員が共有する情報を取得 */
        this.$share.open(function(data,key){
          self.info = data
        })
      },
      /*
       * 同期（情報の更新とキャッシュ）
       */
      synchronize:function(){
        this.$users.get(this.$uid).put(this.user)
        localStorage.setItem('user',JSON.stringify(this.user))
      },
      share:function(){
        this.$share.put(this.info)
      },
      /*
       * 構築（ユーザの設定画面とその表示に利用するポップアップ）
       */
      construct:function(){
        var self = this
        var userInfo = new dat.GUI({
          autoPlace:false
        })
        userInfo.add(this.user,'name').name('名前は？').onChange(function(value){
          self.synchronize()
        })
        userInfo.add(this.user,'floor').min(0).max(13).step(1).name('今何階？').onChange(function(value){
          value = parseInt(value)
          self.synchronize()
        })
        $(this.$refs.settings).append(userInfo.domElement)
        $('.menu .browse')
          .popup({
            inline     :false,
            hoverable  :false,
            on         :'click',
            position   :'top center',
            delay: {
              show: 300,
              hide: 800
            }
          })
        ;
      }
    },
    created:function(){
      if ('user' in localStorage) {
        this.user = JSON.parse(localStorage.getItem('user'))
      }
      this.init()
      this.setup()
      this.synchronize()
    },
    mounted:function(){
      /* 構築:DAT.GUIとPOPUPのDOM */
      this.construct()
      /* 見栄:起動時のアニメーション */
      document.ui.ready()
      /* 対策:クリック遅延（ 300ms）*/
      FastClick.attach(this.$el)
    }
  })

})