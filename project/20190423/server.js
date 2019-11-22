'use strict';

/*
 * 情報
 */
console.dir(process.env)

/*
 * 構成
 */
const http    = require('hapi'),
      httpApp = http.server({
        routes:{
          files:{
            relativeTo:`${__dirname}/`
          }
        },
        host:process.env.HOSTNAME || '192.168.11.8',
        port:process.env.PORT || 8765
      })

/*
 * ＤＢ
 */
var Gun = require('gun')
require('gun/lib/open.js')
require('gun/lib/bye.js')

const gunDB = new Gun({
  web:httpApp.listener,
  localStorage:false,
  radisk:false,
  file:null,
})

/*
 * 登録
 */
async function init(){
  await httpApp.register(require('inert'))
  await httpApp.register(require('hapi-auth-basic'))
  await httpApp.register(require('hapi-auth-ip-whitelist'))
  await httpApp.register({
    plugin:require('blipp'),
    options:{
      showAuth: true,
      showScope:true,
      showStart:true,
    }
  })
}

/*
 * 設定
 */
async function setup(){

  await init()

  httpApp.route([
    {
      path:'/{any*}',
      method:['GET'],
      config:{
        description: 'ファイルとフォルダの返却用',
      },
      handler:{
        directory:{
          listing:true,
          index:true,
          path:'.',
        }
      }
    }
  ])

  await  httpApp.start()
  return httpApp
}

/*
 * 開始
 */
function startup(server){
  console.dir(`Server listening on ${server.info.uri}`)
}

/*
 * 設定後に開始
 */
setup()
  .then(startup).catch(function(error){
})
