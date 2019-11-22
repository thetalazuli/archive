 <template>
   <article v-ui>
     <section>
       <h3 v-divider>お使いのプロバイダ情報を確認しています</h3>
       <check-ip v-model='WebAPI.ip' v-control>
      </check-ip>
    </section>
     <section>
       <h3 v-divider>お使いのデバイスの情報を確認しています</h3>
       <check-device v-model='WebAPI.us' service='96c9e83d40c6402d9867e54e24bd0619' v-control>
      </check-device>
    </section>
     <section>
       <h3 v-divider>お使いのウェブブラウザを確認しています</h3>
       <check-browser-version  v-model='BrowserAPI.list' v-control>
      </check-browser-version>
    </section>
     <section>
       <h3 v-divider>ウェブブラウザの各機能を確認しています</h3>
       <check-browser-feature v-model="flatten(Modernizr,'-')" v-control>
      </check-browser-feature>
    </section>
  </article>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
         inserted:function(el){
           el.id = 'boot'
         }
       }
     },
     components:[
       'url:module/check/check-ip.vue',
       'url:module/check/check-device.vue',
       'url:module/check/check-browser-feature.vue',
       'url:module/check/check-browser-version.vue'
     ],
     data:function(){
       return{
         WebAPI:{
           ip:null,
           us:null
         },
         BrowserAPI:{
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
         }
       }
     },
     watch:{
       '$data':{
         handler:function(self){
           if(self.WebAPI.ip &&
              self.WebAPI.us &&
              self.BrowserAPI.features) {
                alert()
           this.$emit('completed',
              self.BrowserAPI.features)
           }
         },
         deep:true
       }
     },
     computed:{
       mailTo:function(){
         return 'mailto:example@example.jp?subject=このまま送信&body=' + JSON.stringify(this.$data)
       }
     },
     methods:{
       flatten:function(obj,sep){
         var out
         var flatObj
         var toReturn = {};
        
         for (var key in obj) {
           var val = obj[key]
           
           if(!obj.hasOwnProperty(key))
             continue
           if(typeof(val) === 'object'){
             flatObj = this.flatten(val,sep)
             for(k in flatObj){
               if(flatObj.hasOwnProperty(k))
                 toReturn[key+sep+k] = flatObj[k]
               else{
                 continue
               }
             }
           }else{
             toReturn[key] = val
           }
         }
         return toReturn 
       }
     }
   }
</script>
 <style>
   #boot .ui.card{
     width:100%;
     overflow:hidden;
   }
   #boot .ui.table thead th,
   #boot .ui.table tbody td{
     padding:0;
   }
   #boot .ui.table thead th{
     text-transform:uppercase;
   }
   #boot .ui.table thead th:first-child,
   #boot .ui.table tbody td:first-child{
     width:12.5%;
     text-align:center;
   }
   #boot .ui.card,
   #boot .ui.header{
     box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0;
   }
   #boot .ui.divider,
   #boot .ui.table thead th{
     font-weight:normal;
   }
</style>