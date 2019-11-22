(function(root){

  var plugin = {
     init:function(){
       moment.fn.prevNDays = function(n,format,descending){
         var end = new moment(this).set({h:0,m:0,s:0,ms:0})
         var beg = new moment(this).set({h:0,m:0,s:0,ms:0}).subtract(n,'d')
         var arr = new Array(n).fill().map(function(value,index){
           return beg.add(1,'d').format(format)
         })
         return (descending) ?
         arr.reverse() :
         arr
       }
       moment.fn.nextNDays = function(n,format,descending){
         var beg = new moment(this).set({h:0,m:0,s:0,ms:0})
         var end = new moment(this).set({h:0,m:0,s:0,ms:0}).add(n,'d')
         var arr = new Array(n).fill().map(function(value,index){
           return end.subtract(1,'d').format(format)
         })
         return (!descending) ?
         arr.reverse() :
         arr
       }
       moment.fn.rangeNDays = function(n,format,descending){
         var beg = this.prevNDays(n,format)
         var end = this.nextNDays(n,format)
             beg.pop()
         var arr = beg.concat(end)
         return (descending) ?
         arr.reverse() :
         arr
       }
     }
  }

  plugin.init()

  if(typeof module === 'object' && typeof module.exports === 'object' ){
    module.exports = plugin
  }else if( typeof define === 'function' && define.amd ){
    define('arrayDates',plugin)
  }else{
    root.arrayDates = plugin
  }
}(this))

