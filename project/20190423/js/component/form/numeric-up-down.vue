 <template>
  <a
      v-ui-numeric-up-down
      :class="['item',name]">
    <i
        :class="['icon',name]"
        @click='exec'
        @mouseup='clearTimer'
        @mousedown='whileMouseDown'
        @touchend='clearTimer'
        @touchstart='whileMouseDown'></i>
    <input
        ref="input"
        type='number'
        :min='min'
        :max='max'
        :value='value'
        :class="['ui','label','floating',name]"
        @input='inputValue'>
 </a>
</template>
 <script>
  module.exports={
    directives:{
      'ui-numeric-up-down':{
        inserted:function(el){
          el.classList.add('component')
          el.classList.add('numeric-up-down')
        }
      }
    },
    props:{
      name:{
        default:0,
        type:String
      },
      min:{
        default:0,
        type:Number
      },
      max:{
        default:99,
        type:Number
      },
      step:{
        default:1,
        type:Number
      },
      value:{
        default:5,
        type:Number
      },
      action:{
        default:'increase',
        type:String
      }
    },
    data:function(){
      return{
        timer:null,
        timer_interval:150
      }
    },
    computed:{
      exec:function(){
        return this[this.action]
      }
    },
    methods:{
      increase:function(){
        this.updateValue(this.value + this.step)
      },
      decrease:function(){
        this.updateValue(this.value - this.step)
      },
      updateValue:function(val){

        if (val == null){
          val = null
        } 
        else if (val <= this.min){
          val = this.min;
          this.$refs.input.value = this.min
        }
        else if (val >= this.max){
          val = this.max;
          this.$refs.input.value = this.max
        }

        if (val <= this.max && val >= this.min) {
          if (this.value != val){
            this.value = val
            this.$emit('input', val)
          }
        }
      },
      whileMouseDown:function(){
        if (this.timer === null){
          var self = this
          this.timer = setInterval(function(){
            self.exec() }, 
              this.timer_interval)
        }
      },
      inputValue:function(event){
        this.updateValue(
          event.target.value.length
            ? parseInt(event.target.value)
            : null
        )
      },
      clearTimer:function(){
        if(this.timer){
          clearInterval(this.timer)
          this.timer = null
        }
      },
    }
  }
</script>
 <style>
  .ui.menu .item > input[type=number].floating.label{
    font-weight:normal;
    text-align:center;
    padding:.3em 0;
    width:2em;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button{
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    margin:0;
  }
  input[type=number]:focus{
    outline:none;
  }
</style>