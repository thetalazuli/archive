<!---

  CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username`  varchar(255) NOT NULL DEFAULT '',
    `password`  varchar(255) NOT NULL DEFAULT '',
    `firstname` varchar(255) NOT NULL DEFAULT '',
    `lastname`  varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
  );

  https://github.com/MareAustrale/cold-fusion-bookstore
  https://gfonius.net/blog/html5-form-validation-error-message/

  --->
 <style>
  @import url('css/fomantic-ui/2.7.8.min.css');
  html,
  body{
    font-size:12px;
  }
  body{
    display:flex;
    align-items:center;
    justify-content:center;
  }
  main{
    width:100mm;
  }
  form{
    margin-bottom:0;
  }
  .ui.card,
  .ui.message,
  .ui.segment{
    border-bottom:2px solid rgba(34,36,38,.15) !important;
    box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0 !important;
  }
</style>

 <!--- 状態 --->
 <cfset message=''>

 <!--- 登録前:ユーザは存在確認 --->
 <cffunction name='isExists' returnType='boolean'>
   <cfargument name='username' type='string'>
   <cfquery name='check' datasource='sample'>
     select
       *
     from
       users
     where
       username = '#username#'
  </cfquery>
   <cfscript>
    return check.recordCount > 0
  </cfscript>
</cffunction>
 <!--- 登録時:ユーザを登録する --->
 <cffunction name='addUser' returnType='void'>
   <cfquery name='create' datasource='sample'>
     insert into users
       (firstname,lastname,username,password)
     values
       ('#form.firstname#','#form.lastname#','#form.username#',"#hash(form.password,'SHA-256')#")
  </cfquery>
</cffunction>
 <!--- 登録後:ユーザを認証する --->
 <cffunction name='login' returnType='boolean'>
   <cfargument name='username' type='string'>
   <cfargument name='password' type='string'>
   <cfquery name='access' datasource='sample'>
     select
       *
     from
       users
     where
       username = '#username#' and password = "#hash(password,'SHA-256')#"
  </cfquery>
   <!--- ログアウトするまで有効な情報一覧 --->
   <cfset session.user.firstname=access.firstname>
   <cfset session.user.lastname=access.lastname>
   <cfset session.user.username=access.username>

   <cfscript>
     return access.recordCount > 0
  </cfscript>
</cffunction>
 <cffunction name='logout' returnType='boolean'>
   <cfset StructClear(session)>
   <cfreturn true>
</cffunction>

 <cfscript>
   /*
    * ログアウト index.cfm?logout
    */
   if(url.keyExists('logout'))
   {
     if(logout()){
       session.isloggedin=false
       message = 'logout complete'
     }
   }
   /*
    * 登録 index.cfm?sign=up
    * 認証 index.cfm?sign=in
    */
   if(url.keyExists('sign'))
   {
    switch(url.sign){
      case 'up':
        if(isExists(form.username)){
          message = 'username is already exists'
        }else{
          message = 'new user created'
          addUser()
        }
        break;
      case 'in':
        if(
          !form.keyExists('username') || !form.keyExists('password'))
          break;
        if(login(form.username,form.password)){
          message = 'welcome user:' & '#session.user.firstname#'
          session.isloggedin=true
        }else{
          message = "login doesn't match"
        }
        break;
    }
   }
</cfscript>

 <cfprocessingdirective pageEncoding='utf-8'>
  <main>

   <!--- 状態 --->
   <cfif message neq ''>
    <div class='ui message info'>
      <cfscript>
        writeOutput(message)
     </cfscript>
   </div>
  </cfif>

   <!--- ログイン後 --->
   <cfif session.isloggedin>
     <div class='ui card fluid'>
       <div class='image'>
         <img src='https://cataas.com/cat'>
      </div>
    </div>
     <button class='ui button fluid blue'>
       <a href='?logout' style='color:white;'>
         ログアウト
      </a>
    </button>
  </cfif>

   <!--- ログイン前 --->
   <cfif not session.isloggedin>
  
    　<!--- 登録画面（ユーザ）--->
     <div class='ui segment piled green'>
       <h4 class='ui header dividing'>
         User Sign-up
      </h4>
       <form class='ui form' action='?sign=up' method='post'>
         <div class='field'>
           <div class='two fields'>
             <div class='field'>
               <input type='text' name='firstname' placeholder='姓' required>
            </div>
             <div class='field'>
               <input type='text' name='lastname' placeholder='名' required>
            </div>
          </div>
        </div>
         <div class='field'>
           <div class='ui input left icon'>
             <i class='icon mail'></i>
             <input type='text' name='username' placeholder='メール' required>
          </div>
        </div>
         <div class='field'>
           <div class='ui input left icon'>
             <i class='icon lock'></i>
             <input type='text' name='password' placeholder='パスワード' required>
          </div>
        </div>
         <button class='ui button submit green'>
           登録
        </button>
      </form>
    </div>
     <!--- 認証画面（ユーザ）--->
     <div class='ui segment piled blue'>
       <h4 class='ui header dividing'>
         User Sign-in
      </h4>
       <form class='ui form large' action='?sign=in' method='post'>
        <div class='field'>
          <div class='ui input left icon'>
            <i class='icon mail'></i>
            <input type='text' name='username' placeholder='メール' required>
         </div>
       </div>
        <div class='field'>
          <div class='ui input left icon'>
            <i class='icon lock'></i>
            <input type='text' name='password' placeholder='パスワード' required>
         </div>
       </div>
        <button class='ui button submit blue'>
          認証
       </button>
     </form>
    </div>

  </cfif>

 </main>
</cfprocessingdirective>

 <script src='js/jquery-3.4.1.min.js'></script>
 <script>
  /*
   * INPUT:REQUIREDのメッセージを
   * 変更（placeholderを対象の名前にする）
   */
  function init()
  {
    $('input').each(function(i,el){
      var name = el.placeholder
      el.addEventListener('invalid',function(event){
        event.target.setCustomValidity(
          el.validity.valueMissing ? name + 'は入力必須です' : ''
        )
      })
    })
  }
  /*
   * 読込後
   */
  $(function(){
    init()
  })
</script>