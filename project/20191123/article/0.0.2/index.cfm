
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
  .ui.menu,
  .ui.segment{
    border-bottom:2px solid rgba(34,36,38,.15) !important;
    box-shadow:rgba(16, 36, 94, 0.4) 0 2px 6px 0 !important;
  }
  .-lucee-dump table td.luceeH0,
  .-lucee-dump table td.luceeN0{
    background:white !important;
    border-color:#ddd !important;
  }
</style>

 <!---
   https://teratail.com/questions/8426
   https://tenderfeel.xsrv.jp/php/639/
   https://stackoverflow.com/questions/21537511/sql-server-query-with-pagination-and-count
   CREATE TABLE `files` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `description` varchar(255) NOT NULL,
     `name` varchar(255) NOT NULL,
     `size` bigint(20) NOT NULL,
     PRIMARY KEY (`id`)
   );

   insert into files(
     description,
     name,
     size
   )values(
     'test',
     'file',
     1024
   );
   --->
 <cfsetting enablecfoutputonly='true'>
 <cfprocessingdirective pageEncoding='utf-8'>

  <cfset n=2>
  <cfset page=1>
  <cfset skipRows=0>
  <cfset takeRows=5>
  <cfset countPages=0>

  <!--- 取得（レコードの合計）--->
  <cfquery name='count' datasource='sample'>
    select
      count(*) as Rows
    from
      files
 </cfquery>

  <!--- 検証（http://~/index.cfm?page={n}） --->
  <cfif isDefined('URL.page') and isNumeric(URL.page)>
    <!--- 設定（最低限の値のセット） --->
    <cfset page='#URL.page#'>
    <cfset skipRows='#(page - 1) * takeRows#'>
    <cfset countPages='#ceiling(count.Rows / takeRows)#'>
    <!--- 補正（page=0とか負の数になるから範囲を補正する） --->
    <cfset minPage = max(page - n , 1)>
    <cfset maxPage = min(page + n , countPages)>
    <cfset nowPage = min(page - 1, maxPage)>    
 </cfif>

  <cfquery name='listup' datasource='sample'>
   select
     *
   from
     files
   order by
     id
   limit
     #takeRows#
   offset
     #skipRows#
 </cfquery>
  
  <cfoutput>
    <main>
      <!-- list -->
      <div class='ui segment fitted'>
        <cfdump var='#listup#'>
       </cfdump>
     </div>
      <!-- pager -->
      <div class='ui menu pagination'>

        <cfif minPage neq 1>
          <div class='item'>
            <a href='?page=1'>
              <<
           </a>
         </div>
       </cfif>

        <cfloop from='#minPage#' to='#maxPage#' index='no'>
          <cfif nowPage eq (no-1)>
            <div class='item active'>
          <cfelse>
            <div class='item'>
         </cfif>
            <a href='?page=#no#'>
              #no#
           </a>
         </div>
       </cfloop>

        <cfif maxPage neq countPages>
          <div class='item'>
            <a href='?page=#countPages#'>
              >>
           </a>
         </div>
       </cfif>

     </div>

   </main>
 </cfoutput>

</cfprocessingdirective>