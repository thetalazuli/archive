window.MathJax = {
  root:'/js/native/math-jax',
  skipStartupTypeset:true,
  config: ["MMLorHTML.js"],
  jax: ["input/TeX","input/MathML", "input/AsciiMath","output/HTML-CSS","output/NativeMML"],
  extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js"],
  asciimath2jax: {
    delimiters: [['`','`'], ['$','$']]
  },
  "HTML-CSS": {
    matchFontHeight: false,
    preferredFont: null,
    webFont: "STIX"
  },
  TeX: {
    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
  },
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    processEscapes: true
  }
}


Vue.use(VueLoader)

Vue.mixin({
  directives:{
    'header':{
      inserted:function(el){
        el.classList.add('ui','icon','fluid')
        el.classList.add('header','center','aligned')
        el.classList.add('pointing','below','label','teal')
      }
    },
   'divider':{
     inserted:function(el){
       el.classList.add('ui','divider','horizontal')
     }
   },
    'control':{
      inserted:function(el){
        el.classList.add('ui','card')
      }
    },
    'controls':{
      inserted:function(el){
        el.classList.add('ui','stackable','cards')
      }
    }
  }
})


new Vue({
  el:'main',
  components:[
    'url:module/app.vue',
    'url:module/boot.vue',
    'url:module/developer.vue',
    'url:module/loader.vue',
    'url:module/service.vue'
  ],
  data:{
    scripts:null,
    isReady:false
  },
  created:function(){


  },
  methods:{
    onReady:function(){
      this.isReady = true
      this.initUi()
    },
    loadScripts:function(){
      var self = this
      fetch('script/dependence.json')
      .then(function(response){ return response.json() })
      .then(function(json){ self.scripts = json })
    },
    initUi:function(){
      $('.item',this.$refs.menu).tab({

      })
      $('.item',this.$refs.menu).tab('change tab','edit')

    }
  },
  created:function(){
    this.loadScripts()
  },
  mounted:function(){
    console.log('mounted')
  }
})