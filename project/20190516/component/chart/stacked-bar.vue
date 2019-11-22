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
        type:Object
      },
      keys:{
        default:null,
        type:Array
      }
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
        return this.$el.clientWidth
      },
      outerHeight:function(){
        return this.$el.clientHeight
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
      clear:function(){
        this.chart.selectAll('rect').remove()
        this.chart.selectAll('.text-value').remove()
        this.chart.selectAll('.text-percent').remove()
        this.chart.selectAll('.text-label').remove()
      },
      insert:function(){


function groupData(data, total) {
  // use scale to get percent values
  const percent = d3.scaleLinear()
    .domain([0, total])
    .range([0, 100])
  // filter out data that has zero values
  // also get mapping for next placement
  // (save having to format data for d3 stack)
  let cumulative = 0
  const _data = data.map(d => {
    cumulative += d.value
    return {
      value: d.value,
      // want the cumulative to prior value (start of rect)
      cumulative: cumulative - d.value,
      label: d.label,
      percent: percent(d.value)
    }
  }).filter(d => d.value > 0)
  return _data
}



  const total = d3.sum(this.src, d => d.value)
  const _data = groupData(this.src, total)

 const xScale = d3.scaleLinear()
    .domain([0, total])
    .range([0, this.width])

  const barHeight = 35
const halfBarHeight = barHeight / 2
const colors = ['#b5cc18', '#fbbd08', '#2185d0', '#6435c9', '#21ba45', '#ffff33']

        this.chart.selectAll('rect')
          .data(_data)
          .enter().append('rect')
          .attr('class',(d, i) => d.label)
          .attr('x', d => xScale(d.cumulative))
          .attr('y', this.innerHeight / 2 - halfBarHeight)
          .attr('height', barHeight)
          .attr('width', d => xScale(d.value))


        // add values on bar
        this.chart.selectAll('.text-value')
          .data(_data)
          .enter().append('text')
          .attr('class', 'text-value')
          .attr('text-anchor', 'middle')
          .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
          .attr('y', (this.innerHeight / 2) + 5)
          .text(d => d.value)

        // add some labels for percentages
        this.chart.selectAll('.text-percent')
          .data(_data)
          .enter().append('text')
          .attr('class', 'text-percent')
          .attr('text-anchor', 'middle')
          .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
          .attr('y', (this.innerHeight / 2) - (halfBarHeight * 1.1))
          .text(d => d3.format('.1f')(d.percent) + ' %')

        // add the labels
        this.chart.selectAll('.text-label')
          .data(_data)
          .enter().append('text')
          .attr('class', 'text-label')
          .attr('text-anchor', 'middle')
          .attr('x', d => xScale(d.cumulative) + (xScale(d.value) / 2))
          .attr('y', (this.innerHeight / 2) + (halfBarHeight * 1.1) + 20)
          .style('fill', (d, i) => colors[i])
          .text(d => d.label)


      }
    },
    mounted:function(){
      this.init()
      this.insert()
    },
    watch:{
      src:{
        handler:function(val,oldVal){
          this.clear()
          this.insert()
        }
      }
    }
  }
</script>
 <style>

</style>