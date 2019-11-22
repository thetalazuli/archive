 <template>
   <section class='ui segment'>
     <header>
       <div :class="['ui','label','ribbon',color]">
         {{title}}
      </div>
       <div :class="['ui','labels',color]">
         <div class='ui left pointing label image'>
           <img :src='avater'><slot name='comment'></slot>
        </div>
      </div>
    </header>
     <p>
       <slot name='description'></slot>
    </p>
  </section>
</template>
 <script>
   module.exports={
     props:['description','comment','avater','title','color']
   }
</script>
 <style>
</style>