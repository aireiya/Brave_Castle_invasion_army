//tutorial.js

var setu = 0;
var background;

var tutorial = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        setu = 0;

        //森の背景

        background = new cc.Sprite(res.tuto03);
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(1);
        this.addChild(backgroundLayer);

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
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        //■■■■■次の画像に切り替える■■■■■■■■■■■■■■■■■■■■■■■■■■

        if(touch.getLocation().y < 45  && touch.getLocation().y > 0){
          if(touch.getLocation().x < 105 && touch.getLocation().x > 5 && setu > 1 && setu < 4){
            //■■■■■前画像(1番最初,最後は前に戻らないように)■■■■■■■
            console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
            setu--;
        }
          if(touch.getLocation().x < 480 && touch.getLocation().x > 370 ){
            //■■■■■後画像■■■■■■■■■■■■■■■■■■■■■■■■■■
            console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
            setu++;
          }
          //エフェクト
          audioEngine.playEffect(res.se02_mp3);
      }
      //■■■■■チュートリアル終了■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 30  && touch.getLocation().y > 0 && touch.getLocation().x < 350 && touch.getLocation().x > 125){
        //エフェクト
        audioEngine.playEffect(res.se02_mp3);
        // 次のシーンに切り替える
        var a = cc.TransitionFade.create(2.0, new StageSelectScene());
        cc.director.runScene(a);
      }
        switch (setu) {
          case 1:
            //var background = new cc.Sprite(res.tuto04);
            background.initWithFile(res.tuto04);
            break;
          case 2:
            //var background = new cc.Sprite(res.tuto05);
            background.initWithFile(res.tuto05);
            break;
          case 3:
            //var background = new cc.Sprite(res.tuto06);
            background.initWithFile(res.tuto06);
            break;
          case 4:
            var a = cc.TransitionFade.create(2.0, new StageSelectScene());
            cc.director.runScene(a);
            break;

        }

      },
});

var tutoScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new tutorial();
        this.addChild(layer1);
    }
});
