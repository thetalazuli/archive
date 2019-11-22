Vue.component('loader',{
  template:'#file',
  props:{
    title:{
      type:String,
      default:'Untitled'
    }
  },
  data:function(){
    return{
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
})

Vue.use(VueAutoSize)

new Vue({
  el:'main',
  data:{
    title:'hello',
    description:'sss'
  },
  mounted:function(){

  },
  methods:{
    done:function(src){
      console.dir(src)
    }
  }
})