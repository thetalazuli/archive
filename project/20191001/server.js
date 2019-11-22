
'use strict';

var https = {
  files:{
    key:`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAtacTQAGtBIsc3Y1gGZ4WBovOpdmlHhgHanqNqm2YBOf1WRdN
es02ibQbCjwN9WtIiDWu/P04ojVp8kxARY/UVhMZrdgfgsofVIEdqfFK2RHVJXe0
8+9TDAlYffb8xckMxtmKhWF/fzN9BsbN/im4YMHsku+rL4CL/SNYCYGuHjXhGwUg
1LwdQTPyAP+K5SycATvA1Ew4UVmIMB0lotx1yKY4p5rFDaR6x+mRqe7338H/Zi4n
ITgGvo2KuaYKFG30hi5Rua0xk6Hk4rEuzXqhL7vC/bWQvDfejbMZ4oI/vWDOvn7A
WhoJTiY0h5Vzg/7ioRHj3FcxHV1XMCM6Z7cdywIDAQABAoIBAG6fo8p7+sjkixyl
ZxvSuSkdZSh9Rd/w1DtVDQb4HPcH59NsrIOXi5oKs9jkv79wqUhCISHyd9XY339u
TknOkIomsaG8F1yICNJmmxEOX/2XrY1WvD09xv5yhpCXpFIy4PQMMR6PRJzLV12U
HoilEaLjFlZZXI/eIeJz7r5DWi0Mrd+cKESxWSxQBORBGWg3nVN9ZS5HyGyT4sQ1
UAwDsfVP9RPeGc1MVc7ZM4gNXBFh6hOe9T/ZAXfvCNweaWKWtGT79vffnqj76S7m
Q8DGebKV2u+DWsrLqokdqfmRnVps3ZrODL0FhVddX8rp87vqb2yJNu87tQE+7jzc
c4GgR3ECgYEA4tJSIK85iEEKgF+IaGPq/YDTVvJGuZ8cbirQYEYUkG4piVg97tGk
OL0cXTMnJ8lEvhiaXcwXejrimAxVvxSWRGtWw1sqkRWyGgjoUeQEL3a9HbY2ykV9
1M0NJJLOwJJIwj0fZfFvN867n/1eSbxrCVlHv+YhO/xQIdEIO64ODPMCgYEAzQVA
wbru2XFuJvknqgRnAsgaGpd85F3Wc6wgz/NGLiYkBjSMwo8q5j1t6yJoa0UdXyHj
s+QPptN4jWatjaF+kxUPed7Fznwcgvk+ZnjgvrMuCY7Bg4emqjT56gBg5O41USWH
WwFC2NsKJAGN/THhUxZvIbuuzqtgMxvNcA1WAckCgYEAh5ck40b8RHhlF7KEL6sz
SZGeRMaWAtabvzu2zyZ1mpVQHTtz4nTOD+D0uL4gdQc7IcxBUzry+e2DkVMmWxCq
d4IXHrc77fkjO68BehqtadY4XS+U9zutae2eIrPkBngsKHkzcNRwINNjk9N5bujE
r5UAcDXYviwplt2HZ224FoMCgYEAxbDdAnGYQr/nsVjq8DwSgFInKaENYr9BPISr
lxlDgNhyQDGH0Utv2Fc/mE2zVkxsyADLqfitRvX+9oodq8YfYQAbzi4LmtF+RKTF
kNXaEMiCCeFHo+a3xMQUf5kh1V4Et1xyqkQLC0QbASEmoxDn7tBhFKv/IXWK631R
mUyitFECgYA9tufXCnDGTwidqjD17jFJWTQXGO3bZAO1Vw425YhJPXtPkc9MlILy
8eo+ZESrOTdcvDJCnXLrncP4ykZzHdos0/tGG2Q0D1GDfGnm8tiUwAy/43E/mQ12
8g+wRiQLFnraTmm3T7t43hSa1KfxHkJog4KgMv5a30fkil4+Xx+X4w==
-----END RSA PRIVATE KEY-----`,
    cert:`-----BEGIN CERTIFICATE-----
MIIC5TCCAc2gAwIBAgIJAOEfzi/nQjBBMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV
BAMMCWxvY2FsaG9zdDAeFw0xOTEwMjgwMDIyNDBaFw0xOTExMjcwMDIyNDBaMBQx
EjAQBgNVBAMMCWxvY2FsaG9zdDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALWnE0ABrQSLHN2NYBmeFgaLzqXZpR4YB2p6japtmATn9VkXTXrNNom0Gwo8
DfVrSIg1rvz9OKI1afJMQEWP1FYTGa3YH4LKH1SBHanxStkR1SV3tPPvUwwJWH32
/MXJDMbZioVhf38zfQbGzf4puGDB7JLvqy+Ai/0jWAmBrh414RsFINS8HUEz8gD/
iuUsnAE7wNRMOFFZiDAdJaLcdcimOKeaxQ2kesfpkanu99/B/2YuJyE4Br6Nirmm
ChRt9IYuUbmtMZOh5OKxLs16oS+7wv21kLw33o2zGeKCP71gzr5+wFoaCU4mNIeV
c4P+4qER49xXMR1dVzAjOme3HcsCAwEAAaM6MDgwFAYDVR0RBA0wC4IJbG9jYWxo
b3N0MAsGA1UdDwQEAwIHgDATBgNVHSUEDDAKBggrBgEFBQcDATANBgkqhkiG9w0B
AQsFAAOCAQEAaUVXMka/WiIJyu+LSmwQ944A45FU7rkHTlIkgNuYCTfilrcnVyv4
0XwRtd0/wM0YXalfwl2rhxp8RFWATvdEU+fdLwsQuuohRFA1TISIyBwUdCxh6o61
RWre++4rtw+C9qd699wDiGKwNlss4x/0XHB/4cyhVKBhS6yZihWnmIMKFaoL12KZ
aE+FjYP9iG1/JE6rf9vnlM32WQ0f2N0128N1JSuDTEjjS+qAE7bnt+zGuNQvNf+4
94ac8MRT4MtwVDKuCxz6+hKB+rpr8dTZBq7YGygVo9cs1Q9dytOtJ/2vYpnWM7Wt
0AKZm4tJtuXrgGGUB/c61UmMI5esDzQiiA==
-----END CERTIFICATE-----`
  }
}

const http    = require('hapi'),
      httpApp = http.server({
        routes:{
          files:{
            relativeTo:`${__dirname}/`
          }
        },
        host:process.env.HOSTNAME  || '192.168.11.8',
        port:process.env.PORT      || 8765,
        tls:https.files,
      })

var Gun = require('gun')
          require('gun/lib/open.js')

	/* file.js error吐くからコメントアウト
	Gun.log.once(
		'file-warning',
		'WARNING! This `file.js` module for gun is ' +
		'intended for local development testing only!'
	);
	*/
const gunDB = new Gun({
  web:httpApp.listener,
  localStorage:true,
  radisk:false,
  file:true,
})

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

async function setup(){

  await init()
    
  httpApp.route([
    {
      path:'/{any*}',
      method:['GET'],
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

function startup(server){
  console.dir(`Server listening on ${server.info.uri}`)
}

setup()
  .then(startup).catch(function(error){
    console.dir(error)
})