 <template>
   <div>
   <!--
   <div class='up ui segment'>
   <div id='file' @drop='onDrop' @dragover.prevent>
      <nav class='ui labels orange'>
        <div class='ui label' v-if='convertedSize != 0'>
          {{convertedSize}}
       </div>
        <label class='ui label'>
          <i class='icon plus'></i>
          <input @change='onChange' type='file' name='image'>
       </label>
     </nav>
      <div class='ui label orange ribbon  title'>
        {{title}}
     </div>
      <img
       v-if="blobURL != ''"
       class='ui image fluid'
       :src='blobURL'>
   </div>
  </div>
-->


<!--
    <div class="ui card fluid">
      <div class="content">
        <a class="header"><input type='text' v-model='header.title' v-autosize></a>
        <div class="meta">
          <span class="date">Published in 2019</span>
        </div>
        <div class="description">
          <textarea v-model='header.description' v-autosize>
          </textarea>
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
-->
     <router-view name='articles'>
    </router-view>


     <router-view name='editor'>
    </router-view>

     <router-view name='summary'>
    </router-view>





<!-- やはり画面は上下に二個に限定する 


  <div class='ui menu pointing icon'>
    <div class='item active'><i class='icon edit'></i></div>
    trashが押されるとエディタがリストに切り替わり、記事の右上trashあいこんが押される度にリストに溜まり、一括削除可能となる 
    <div class='item'><i class='icon trash'></i></div>
    <div class='item'><i class='icon star'></i></div>
  </div>

<div class='ui segments'>
<div class='ui segment editor'>
        <div @click='slide' class='ui label corner'>
           <i class='icon hdd'></i>
        </div>
     <codemirror v-model='content'>
    </codemirror>
    </div>
</div>

-->
    </div>
</template>
 <script>
   module.exports={
     computed:{
       title:function(){
         return this.$store.getters.title
       },
              header:function(){
         return this.$store.getters.header
       }
     },
  data:function(){
    return{
     content:'',
     blob:null,
     blobURL:'',
     quality: 0.3,
     convertedSize:0
    }
  },
  created:function(){
    var self = this
    localforage.getItem('cover',function(err,obj){
      if(!obj){
        return
      }
      console.dir(obj)
      obj.blobURL = URL.createObjectURL(obj.blob)
      Object.assign(self.$data,obj)
    })
  },
  watch:{
    'blobURL':{
      handler:function(val){
        localforage.setItem('cover',this.$data)
      }
    }
  },
  methods:{
    slide:function(){
      
    },
     set:function(blob){
       this.blob = blob
       this.blobURL = URL.createObjectURL(blob)
       this.convertedSize = filesize(blob.size, {round: 0})
       this.$emit('uploaded',this.blobURL)
     },
     createFile:function(file){
       var self = this

       new Compressor(file, {
       quality: self.quality,
       mimeType: 'image/jpeg',
       success(result) {

         console.dir(result)
         console.dir(typeof result)
         console.dir(URL.createObjectURL(result))
         console.dir(filesize(result.size, {round: 0}))

         self.set(result)
       },
       error(err) {
         console.log(err.message);
       },
     })
    },
    onChange:function(e){
      var files = e.target.files;
      this.createFile(files[0]);
    },
    onDrop:function(e){
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    }
  }



   }
</script>
 <style>

    .ui.label>.icon{
      margin-right:0;
    }
   textarea,
   input[type=text]{
     width:100%;
     border:none;
     outline:none;
     box-shadow:none;
     appearance:none;
     background:transparent;
   }
    .ui.segment .ui.label.title{
     position:absolute;
     z-index:999;
     left:-1rem;
     top:+1rem;
   }
    .up.ui.segment{
     padding:0;
    }
    .up.ui.segment nav{
     position: absolute;
     text-align:right;
     width:calc(100%);
     z-index: 999;
     right: -1em;
     top: -1em;
    }
    input[type="file"] {
      display:none;
    }
</style>