 <template>
   <div v-ui>

<!--
     <div class='ui labels rain blue'>
       <div class='ui label pointing below'>
         最近
      </div>
       <div class='ui label'>
         10件
      </div>
       <div class='ui label'>
         20件
      </div>
       <div class='ui label'>
         30件
      </div>
    </div>

  -->
       <template v-for='timestamp in _.keys(store.pages).slice(-10)'>
          <div class='ui segments'>
         <E-記事の表示と編集 class='ui segment noborder' color='blue' v-model='store.pages[timestamp]'>
           <template v-slot:labels>
             <div class='ui label right pointing'>
               {{ timestamp | MMDD }}
            </div>
          </template>
        </E-記事の表示と編集>
            </div>
      </template>

  </div>
</template>
 <script>
   module.exports={
     
   }
</script>
 <style>
</style>