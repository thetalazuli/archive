 <template>
   <section v-ui>
     <div class='image'>
       <div class='ui embed'>
         <div class='embed'>
           <div ref='youtube'>
          </div>
        </div>
      </div>
    </div>
     <div class='content'>
       <div class='description'>
         <p>コミュニケーションする為のツールです。誰でも世界に１つだけのノートを持てて<a @click="player.seekTo(10,true)">リフィル</a>という形で投稿は簡単、誰かのノートに参加すれば世界に１つだけのノートをみんなで作れます</p>
      </div>
    </div>
  </section>
</template>
 <script>
   module.exports={
     directives:{
       'ui':{
          inserted:function(el){
            el.id = 'platform'
          }
       }
     },
     data:function(){
       return{
         player:null,
         id:'TX173u2Ry7A',
       }
     },
     methods:{
       iframeAPI:function(){
         var tag = document.createElement('script')
         tag.src = "https://www.youtube.com/iframe_api"
         var firstScriptTag = document.getElementsByTagName('script')[0]
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
       },
       iframeAPIReady:function(){
         var self = this
         window.onYouTubeIframeAPIReady = function(){
           self.player = new YT.Player(self.$refs.youtube,{
             videoId : self.id,
             height  :'100%',
             width   :'100%',
             events  :{
               onReady:function(){
                 self.player.playVideo()
               }
             }
           })
         }
       }
     },
     created:function(){
       this.iframeAPI()
       this.iframeAPIReady()
     }
   }
</script>
 <style>
   #platform .embed{
     display:block;
   }
</style>