 <template>
   <section v-ui>
     <div v-controls>
       <div v-control>
         <div ref='dat1'>
        </div>
      </div>
       <div v-control>
         <div ref='dat2'>
        </div>
      </div>
    </div>
  </section>
</template>
 <script>
   module.exports = {
    directives:{
      'ui':{
        inserted:function(el){
          el.classList.add('setting')
        }
      }
    },
    model:{
      prop:'db',
      event:'input'
    },
    props:{
      no:Number,
      db:Object,
      detail:String,
      isShow:Boolean
    },
    data:function(){
      return{
        dat:null
      }
    },
    computed:{
    },
    methods:{
      toggle:function(){
        this.isShow = !this.isShow
      }
    },
    mounted:function(){
      dat.GUI.TEXT_CLOSED ='設定'
      this.dat1 = new dat.GUI({
        autoPlace:false,
        closeOnTop:true
      })
  console.log(this.dat1)
        this.dat2 = new dat.GUI({
        autoPlace:false,
        closeOnTop:true
      })
      this.dat1.__closeButton.innerText = '1'

      this.dat2.__closeButton.innerText = '2'    


      var arg = {
        sample:10
      }
      this.dat1.add(arg,'sample')
      this.dat2.add(arg,'sample')
      $(this.$refs.dat1).append(this.dat1.domElement)
      $(this.$refs.dat2).append(this.dat2.domElement)

    }
   }
</script>
 <style>
  .dg.main,
  .dg.main .close-button{
    width:100% !important;
  }
</style>