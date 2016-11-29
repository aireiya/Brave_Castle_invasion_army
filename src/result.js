//stageselect.js

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);

var rank;

var R_pt = 0;

var result = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //BGM
        audioEngine.stopMusic();//前BGMの停止
        //音楽再生エンジン
        audioEngine = cc.audioEngine;

        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.result_mp3 , true);
        }

        //背景
        var background = new cc.Sprite(res.background08_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height * 0.65));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(0.7);
        this.addChild(backgroundLayer);

        //コメント枠
        back = cc.Layer.create();
        this.addChild(back);
        bg = cc.Sprite.create(res.background15_png);
        back.addChild(bg, 0);
        bg.setPosition(size.width * 0.58,size.height * 0.25, 15);

        //next枠
        back = cc.Layer.create();
        this.addChild(back);
        bg = cc.Sprite.create(res.background14_png);
        back.addChild(bg, 0);
        bg.setPosition(size.width * 0.8,size.height * 0.065, 15);

        //ゲームクリア
        var label01 = cc.LabelTTF.create("STAGE CLEAR!", "Arial", 40);
        label01.setColor(color);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width / 2,size.height * 0.85, 15);

        //攻略時間
        var label02 = cc.LabelTTF.create("攻略時間：" + timer + "秒", "Arial", 30);
        label02.setColor(255,255,255);
        this.addChild(label02); //文字つける時はこっち*/
        label02.setPosition(size.width / 2,size.height * 0.7, 15);

        //YES NO
        var label03 = cc.LabelTTF.create("敵撃破数："+ gekiha, "Arial", 30);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.6, 15);

        //YES NO
        var label04 = cc.LabelTTF.create("残存拠点HP：" + playerCS + "%", "Arial", 30);
        label04.setColor(255,255,255);
        this.addChild(label04); //文字つける時はこっち*/
        label04.setPosition(size.width / 2,size.height * 0.5, 15);

        //YES NO
        var label05 = cc.LabelTTF.create("ランク:", "Arial", 30);
        label05.setColor(color);
        this.addChild(label05); //文字つける時はこっち*/
        label05.setPosition(size.width * 0.8,size.height * 0.4, 15);

        //ランク変化でしゃべるやつ
        var label06 = cc.LabelTTF.create("素晴らしい成果です。", "Arial", 25);
        label06.setColor(255,255,255);
        this.addChild(label06); //文字つける時はこっち*/
        label06.setPosition(size.width * 0.6,size.height * 0.3, 15);

        //クリアpt
        var label07 = cc.LabelTTF.create("クリアpt00pt獲得です。", "Arial", 25);
        label07.setColor(255,255,255);
        this.addChild(label07); //文字つける時はこっち*/
        label07.setPosition(size.width * 0.6,size.height * 0.2, 15);

        //NEXT STAGE
        var label08 = cc.LabelTTF.create("NEXT STAGE⇒", "Arial", 20);
        label08.setColor(color02);
        this.addChild(label08); //文字つける時はこっち*/
        label08.setPosition(size.width * 0.8,size.height * 0.06, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width / 5, size.height * 0.25);
        this.addChild(drop01);

        //■■■■■■■■■■評価項目■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //タイマー評価
                if(timer < 120)  { R_pt++;
                  if(timer < 100) { R_pt++;
                    if(timer < 80) { R_pt++;
                      if(timer < 60){ R_pt++;
                        if(timer < 40) { R_pt++;
                          if(timer < 20) { R_pt++;
                    }}}}}}

        //敵撃破評価
                if(gekiha > 5)  { R_pt++;
                  if(gekiha > 10) { R_pt++;
                    if(gekiha > 15) { R_pt++;
                      if(gekiha > 20){ R_pt++;
                        if(gekiha > 25) { R_pt++;
                          if(gekiha > 30) { R_pt++;
                          }}}}}}

        //拠点体力評価
                if(playerCS > 10)  { R_pt++;
                  if(playerCS > 20) { R_pt++;
                    if(playerCS > 30) { R_pt++;
                      if(playerCS > 40){ R_pt++;
                        if(playerCS > 50) { R_pt++;
                          if(playerCS > 60) { R_pt++;
                            if(playerCS > 70){ R_pt++;
                              if(playerCS > 80) { R_pt++;
                                if(playerCS > 90) { R_pt++;
                                  if(playerCS > 100) { R_pt += 3;
                          }}}}}}}}}}

        //総合評価
                if(R_pt >= 20) {
                  label05.setString("ランク:S!!"); //S
                  label06.setString("文句なしでございます。");
                  var rand03 = Math.floor( Math.random() * 50+ 1 ) ;
                  rand03 += 200;
              }
                if(R_pt < 20 && R_pt >= 15) {
                  label05.setString("ランク:A!"); //A
                  label06.setString("素晴らしい成果です。");
                  var rand03 = Math.floor( Math.random() * 50+ 1 ) ;
                  rand03 += 150;
                }
                if(R_pt < 15 && R_pt >= 10) {
                  label05.setString("ランク:B");//B
                  label06.setString("まぁまぁ、でしょうか。");
                  var rand03 = Math.floor( Math.random() * 50+ 1 ) ;
                  rand03 += 100;
                }
                if(R_pt < 10 && R_pt >= 5)  {
                  label05.setString("ランク:C"); //C
                  label06.setString("少し被害が大きいですね。");
                  var rand03 = Math.floor( Math.random() * 50+ 1 ) ;
                  rand03 += 50;
                }
                if(R_pt < 5) {
                  label05.setString("ランク:D");  //D
                  label06.setString("辛い戦いでしたね・・・");
                  var rand03 = Math.floor( Math.random() * 20+ 1 ) ;
                  rand03 += 30;
                }
                label07.setString("クリアpt  " + rand03 + "pt獲得です。");
                point += rand03;

        //■■■■■■■■■■評価項目おわり■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        // タップイベントリスナーを登録する
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan,
                    onTouchMoved: this.onTouchMoved,
                    onTouchEnded: this.onTouchEnded
                }, this);

        return true;
    },
      onTouchBegan: function(touch, event) {
        if(touch.getLocation().x < 460 && touch.getLocation().y < 30 && touch.getLocation().x > 310 && touch.getLocation().y > 10 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          var a = cc.TransitionFade.create(2.0, new StageSelectScene());
          cc.director.runScene(a);
        }
        if(touch.getLocation().x < 330 && touch.getLocation().y < 320 && touch.getLocation().x > 150 && touch.getLocation().y > 100 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          //cc.director.runScene(new GameOverScene());
        }
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new GameOverScene());
      },
});

var ResultScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new result();
        this.addChild(layer1);
    }
});
