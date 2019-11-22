 <template>
   <div v-ui>
<div class='ui labels'>
     <h1 class='ui label ribbon blue'>
       読込情報
    </h1>
    </div>
     <template v-for='(group,name,i) in js.groups'>
       <h3 class='ui divider horizontal'>
         {{name}}関連のファイルを読み込んでいます
      </h3>
       <div v-if='step >= i' class='ui segments'>
         <E-パッケージの読込 :location="'js/' + name + '/'" :list='js.groups[name]' :settings='js.depends' @loaded='next'>
        </E-パッケージの読込>
      </div>
    </template>
<div class='ui labels'>
     <h1 class='ui label ribbon blue'>
       対応情報
    </h1>
    </div>
     <template>
       <h2 class='ui divider horizontal'>
         お使いのバージョン情報を検証しています
      </h2>

        <E-ブラウザのバージョンの確認 v-model='require.list' class='ui segments'>
      </E-ブラウザのバージョンの確認 >

       <h2 class='ui divider horizontal'>
         ウェブブラウザの各機能を確認しています
      </h2>
       <E-ブラウザの機能の確認 class='ui segments'>
      </E-ブラウザの機能の確認>

       <h2 class='ui divider horizontal'>
         お使いのデバイスの情報を確認しています
      </h2>
       <E-デバイスの情報の確認 class='ui segments'>
      </E-デバイスの情報の確認>

       <h2 class='ui divider horizontal'>
         お使いのプロバイダ情報を確認しています
      </h2>
       <E-ブラウザの接続元の確認 class='ui segments'>
      </E-ブラウザの接続元の確認>
    </template>

  </div>
</template>
 <script>
   module.exports={
     props:{
       path:{
         type:String,
         default:''
       }
     },
     components:{
       'E-パッケージの読込':'url:application/ui-boot/E-パッケージの読込.vue',
       'E-ブラウザの接続元の確認':'url:application/ui-boot/E-ブラウザの接続元の確認.vue',
       'E-ブラウザの機能の確認':'url:application/ui-boot/E-ブラウザの機能の確認.vue',
       'E-ブラウザのバージョンの確認':'url:application/ui-boot/E-ブラウザのバージョンの確認.vue',
       'E-デバイスの情報の確認':'url:application/ui-boot/E-デバイスの情報の確認.vue',


     },
     data:function(){
       return{
         features:{},
         sample:{},
         require:{
           list:{
             'Chrome'        : 65,
             'Safari'        : 60,
             'Mobile Safari' : 60,
             'Firefox'       : 60,
             'Edge'          : false,
             'Opera'         : false,
             'Vivaldi'       : false,
             'Yandex'        : false,
             'IE'            : false
           }
         },
         info:{
           agent:null
         },
         isLoaded:false,
         step:0,
         js:{
         }
       }
     },
     watch:{
       step:{
         handler:function(i){
           if(this.step == Object.keys(this.js.groups).length){
             this.isLoaded = true
             this.$emit('loaded')
           }
         }
       }
     },
     methods:{
       next:function(){
         this.step = this.step + 1
       },
       init:function(){
         var self = this
         fetch(this.path).then(function(response){
           return response.json()
         }).then(function(json){
           self.js = json
         })
       }
     },
     created:function(){
       this.init()
       this.features = Modernizr
     }
   }
</script>
 <style>


</style>