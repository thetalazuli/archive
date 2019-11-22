 <template>
   <div>
      <div class='ui segments'>
     <segment color='blue' title='NOTE' avater='/asset/favicon.ico'>
       <template v-slot:comment>
         新しいノートの形
      </template>
       <template v-slot:description>
         このノートは虹色のタグに記事を積み重ねることが出来ます。世界中のライブラリを利用して記事としてスライドショーやハイライトされたコードに数式、画像をインスタグラムのようにエフェクトをかける事も出来る新しいインターフェイスです。是非、お使いになってください
      </template>
    </segment>
     <segment color='teal' title='NEWS' avater='/asset/favicon.ico'>
       <template v-slot:comment>
         当サイトがGIGAZINEに紹介されました
      </template>
       <template v-slot:description>
         リフィルの機能、表現できる情報の種類、インタビューも受けさせていただきました。いやぁ嬉しいです。多くの方と知り合う機会をいただきました。ツイッターのフォロワーは５００人超えて、ありがとうございます。とても嬉しいです。続・開発という事で機能募集しています
      </template>
    </segment>
     <segment color='green' title='DEVS' avater='/asset/favicon.ico'>
       <template v-slot:comment>
         リフィルにコードのハイライトを追加しました
      </template>
       <template v-slot:description>
         著者：IvanSagalaevさんのHIGHLIGHT.JSを利用しています。兼ねてより要望の多かった機能です。技術者であればコードを投稿することはよくあります。対応出来たことはこのサービスに楽しさを与えてくれます。また、数式を表示するリフィルも開発中です。来月に発表予定です</p>
      </template>
    </segment>
   </div>


</div>
</template>
 <script>
   module.exports={

     components:[
       'url:view/home/top/segment.vue'
     ]

   }
</script>
 <style>
</style>