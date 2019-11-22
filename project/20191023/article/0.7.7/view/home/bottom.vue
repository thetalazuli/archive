 <template>
   <article class='home top'>

<!-- 背筋のようにここにはrouter-viewが並ぶ -->

   <router-view name='aboutdoc'>
  </router-view>

   <router-view name='helpdoc'>
  </router-view>

   <router-view name='developersdoc'>
  </router-view>

  </article>
</template>
 <script>
   module.exports={

   }
</script>
 <style>
   .home header:after{
     display:block;
     clear:both;
     content:'';
     height:0;
   }
   .home header .ui.label.ribbon{
     margin-bottom:1em;
     float:left;
   }
   .home p{
     line-height:1.2;
   }
</style>