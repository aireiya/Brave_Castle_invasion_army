//gameover.js
var gameover = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //var label = cc.LabelTTF.create("GameOver", "Arial", 40);
        //label.setPosition(size.width / 2, size.height / 2);
        //this.addChild(label, 1);

        //背景
        var background = new cc.Sprite(res.background05_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width * 0.8, size.height * 0.2));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(0.3);
        this.addChild(backgroundLayer);

        //ゲームオーバー
        label01 = cc.LabelTTF.create("GAME OVER", "Arial", 40);
        label01.setColor(255,255,255);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width / 2,size.height * 0.8, 15);

        //リトライ？
        label02 = cc.LabelTTF.create("リトライ？", "Arial", 40);
        label02.setColor(255,255,255);
        this.addChild(label02); //文字つける時はこっち*/
        label02.setPosition(size.width / 2,size.height * 0.6, 15);

        //YES NO
        label03 = cc.LabelTTF.create("YES        NO", "Arial", 40);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.4, 15);

        //ランダムでしゃべるやつ
        label03 = cc.LabelTTF.create("<撤退もまた戦略", "Arial", 30);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.2, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width / 5, size.height * 0.15);
        this.addChild(drop01);

        /*var drop02 = cc.Sprite.create(res.replay_png);　
        drop02.setPosition(size.width / 2, size.height * 0.2);　
        this.addChild(drop02);*/

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
        if(touch.getLocation().x < 210 && touch.getLocation().y < 150 && touch.getLocation().x > 120 && touch.getLocation().y > 110 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          var a = cc.TransitionFade.create(2.0, new gameScene());
          cc.director.runScene(a);
        }
        if(touch.getLocation().x < 350 && touch.getLocation().y < 150 && touch.getLocation().x > 290 && touch.getLocation().y > 110 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          var a = cc.TransitionFade.create(2.0, new StageSelectScene());
          cc.director.runScene(a);
        }
        if(touch.getLocation().x < 460 && touch.getLocation().y < 100 && touch.getLocation().x > 300 && touch.getLocation().y > 0 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          var a = cc.TransitionFade.create(2.0, new ZenkaiScene03());
          cc.director.runScene(a);
        }
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new TitleScene());
      },
});

var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(20, 50, 20, 128));
        this.addChild(backgroundLayer);

        var layer1 = new gameover();
        this.addChild(layer1);
    }
});
