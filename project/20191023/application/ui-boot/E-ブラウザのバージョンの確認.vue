 <template>
   <section v-ui>
     <table class='ui table single line unstackable celled fixed very basic'>
       <thead>
         <th>no</th>
         <th>name</th>
         <th>version</th>
      </thead>
       <tbody>
         <tr v-for='(result,name,no) in db'>
           <td>{{no+1}}</td>
           <td>{{name}}</td>
           <td>{{result}}</td>
        </tr>
      </tbody>
    </table>
     <div class='ui message mini info attached bottom' id='outdated'>
       あなたのウェブブラウザはサポートされたバージョンです
    </div>
  </section>
</template>
 <script>
   module.exports={
     model:{
       prop:'db',
       event:'input'
     },
     props:{
       db:Object,
       default:null,
       required:true
     },
     mounted:function(){
       new outdatedBrowserRework({
         fade                   :false,
         language               :'ja',
         fullscreen             :false,
         isUnknownBrowserOK     :false, 
         browserSupport         :this.db,
         requireChromeOnAndroid :false,
         messages: {
           ja: {
             outOfDate    :'お使いのウェブブラウザは時代遅れです',
             unsupported  :'お使いのウェブブラウザはサポートされていません',
             update: {
               web        :'正しく表示するためにウェブブラウザを更新してみましょう',
               googlePlay :'Google PlayからChromeをインストールしましょう',
               appStore   :'設定アプリからiOSを更新しましょう'
             },
             url:'http://outdatedbrowser.com/',
             callToAction :'今すぐウェブブラウザを更新する (Click)',
             close        :'閉じる'
           }
         }
       })
     }
   }
</script>
 <style>
.E-ブラウザのバージョンの確認 .ui.table>thead>tr>th,
.E-ブラウザのバージョンの確認 .ui.table>tbody>tr>td{
  padding:0;
}
.E-ブラウザのバージョンの確認 .ui.table thead th{
  text-transform:uppercase;
}
.E-ブラウザのバージョンの確認 .ui.table>thead>tr>th:first-child,
.E-ブラウザのバージョンの確認 .ui.table>tbody>tr>td:first-child{
  width:12.5%;
  text-align:center;
}
.E-ブラウザのバージョンの確認 .ui.table{
  margin-bottom:0;
}
.E-ブラウザのバージョンの確認 .ui.mini.message > .close.icon{
  display:none;
}
.E-ブラウザのバージョンの確認 .ui.mini.message{
  box-shadow:none;
  border:none;
}
</style>