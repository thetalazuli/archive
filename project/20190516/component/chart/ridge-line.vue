 <template>
  <div v-ui-chart>
    <svg ref='view'>
   </svg>
 </div>
</template>
 <script>
  module.exports = {
    directives:{
      'ui-chart':{
        inserted:function(el){
          el.classList.add('ui','component','chart')
        }
      }
    },
    props:{
      src:{
        default:null,
        type:Array
      },
      keys:{
        default:null,
        type:Array
      },
    },
    data:function(){
      return {
        svg:null,
        area:null,
        chart:null,
        view:{
          margin:{
            top:10,
            left:10,
            right:10,
            bottom:10,
          },
          padding:{
            top:0,
            left:0,
            right:0,
            bottom:5,
          }
        },
        xAxis:null,
        yAxis:null,
      }
    },
    computed:{
      outerWidth:function(){
        this.$el.style.display = 'block'
        return $(this.$el).width()
 
      },
      outerHeight:function(){
        this.$el.style.display = 'block'
        return $(this.$el).height()
      },
      innerWidth:function(){
        return this.outerWidth  - (this.view.margin.left + this.view.margin.right)
      },
      innerHeight:function(){
        return this.outerHeight - (this.view.margin.top + this.view.margin.bottom)
      },
      width:function(){
        return this.innerWidth  - (this.view.padding.left + this.view.padding.right)
      },
      height:function(){
        return this.innerHeight - (this.view.padding.top + this.view.padding.bottom)
      }
    },
    methods:{
      tls:function(x,y){
        return 'translate(' + x + ',' + y + ')' 
      },
      init:function(){

        this.svg = d3.select(this.$refs.view)
                .attr('width', this.outerWidth)
                .attr('height',this.outerHeight)

        this.area = this.svg.append('g')
                .attr('transform',this.tls(this.view.margin.left,this.view.margin.top))
        this.chart = this.area.append("g")
                .attr('transform',this.tls(this.view.padding.left,this.view.padding.top))

      },
      axis:function(){
        this.xAxis = d3.scaleLinear()
                  .domain([-10, 70 ])
                  .range([ 0, this.width ]);      
        this.yAxis = d3.scaleLinear()
                  .domain([0,0.1])
                  .range([this.height,0])  
      },
      draw:function(){
        /*
        this.area.append('rect')
            .attr('class','outer')
            .attr('width', this.innerWidth)
            .attr('height',this.innerHeight)
        this.chart.append('rect')
            .attr('class','inner')
            .attr('width',  this.width)
            .attr('height', this.height)
         */
        this.chart.append("g")
            .attr('class','grid')
            .attr('transform',this.tls(0,this.height))
            .call(d3.axisBottom(this.xAxis).tickSize(-this.height))
        this.chart.append('g')
            .attr('class','grid')
            .call(d3.axisLeft(this.yAxis).tickSize(-this.width).tickFormat(''))
      },
      insert:function(task){

        function kernelDensityEstimator(kernel, X) {
          return function(V) {
            return X.map(function(x) {
              return [x, d3.mean(V, function(v) { return kernel(x - v); })];
            })
          }
        }

        function kernelEpanechnikov(k) {
          return function(v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
          }
        }

        if (!this.src.length)
          return
        var kde = kernelDensityEstimator(kernelEpanechnikov(7), this.xAxis.ticks(40))
        var density =  kde( _.map(this.src,task) )
        var self = this
      
        // Add areas
        this.chart
            .append('path')
            .datum(density)
            .attr('class',task + ' task')
            .attr("stroke", "#000")
            .attr("stroke-width", 0)
            .attr('d',  d3.line()
              .curve(d3.curveBasis)
              .x(function(d) {
                return self.xAxis(d[0]); })
              .y(function(d) {
                return self.yAxis(d[1]); })
            )
       

      }
    },
    mounted:function(){
      this.init()
      this.axis()
      this.draw()
      var self = this
      _.each(this.keys,function(key){
        self.insert(key)
      })

      this.$emit('mounted')
    },
    watch:{
      src:{
        handler:function(val,oldVal){
          this.chart.selectAll('path').remove()
          var self = this
          _.each(this.keys,function(key){
            self.insert(key)
          })
        },
        deep:true
      }
    }
  }
</script>
 <style>
.ui.chart{
  display:block;
  overflow:visible;
}
.ui.chart rect.outer{
  fill:none;
  stroke:black;
}
.ui.chart rect.inner{
  fill:none;
  stroke:black;
  stroke-dasharray:3,4;
}
text{
  font-size:12px;
}
.grid line {
  stroke: lightgrey;
  stroke-width:1;
  stroke-opacity: 0.7;
  shape-rendering: crispEdges;
}
</style>