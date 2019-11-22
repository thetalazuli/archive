new Vue({
  el:'main',
  data:{
    uri:'',       /* ｽｸﾚｲﾋﾟﾝｸﾞ */
    src:'',       /* HTML-TEXT */
    rooms:[],     /* 12階分:[td] */
    floors:[],    /* 12階分:[table] */
    cleanup:[],   /* 12階分:[客室清掃完 or 客室清掃済]した数 */
    type:[        /* 01階分:112室分の部屋の種類（シングルとワイド以外はT or ET） */
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      '-',
      '-',
      '-',
      'S',
      '-',
      '-',
      '-',
      '-',
      'S',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      'S',
      '-',
      'S',
      '-',
      '-',
      '-',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      '-',
      '-',
      '-',
      'S',
      '-',
      '-',
      '-',
      '-',
      'S',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      '-',
      'S',
      '-',
      'W',
      '-',
      '-',
      '-',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
      'S',
    ]
  },
  computed:{
    src2dom:function(){
      /* TEXT-HTML to DOM */
      return $('<div></div>').html(this.src)
    },
    src2json:function(){
      /* TEXT-HTML to JSON */
      return html2json(this.src)
    }
  },
  filters:{
    suffix:function(val){
      /* 階 */
      return val + 'F'
    }
  },
  watch:{
    uri:{
      handler:function(){
        this.update()
      }
    },
    src:{
      handler:function(){
        var self=this
        /* 12階分を取得 */
        this.floors = this.src2dom.find('table.rooms').splice(0,12)
        this.floors.forEach(function(rooms,i){
          /* 112室分の状態を取得 */
          self.rooms[i] = $(rooms).find('td.room')
          /* 112室分の状態を検索[客室清掃完 or 客室清掃済] 数を取得 */
          self.cleanup[i] = $(rooms).find('td.room.seisou, td.room.clean').length
        })
      }
    }
  },
  methods:{
    status:function(floor,no){
      return $(this.rooms[floor-1][no-1]).attr('class')
    },
    update:function(){

      if(this.uri == '')
        return

      var self=this
      fetch(this.uri).then(function(response){
        return response.text()
      }).then(function(html){
        self.src = html
      }).catch(function(err){
        alert(err)
      })
      
    },
    poling:function(){
      var self = this
      setInterval(function(){
        self.update()
      },60 * 1000)
    }
  },
  created:function(){
    /* 本番では書き換える（to room_status.php） */
    this.uri = 'room_status.php.html'
    this.poling()
  },
  mounted:function(){
    this.update()
  }
})