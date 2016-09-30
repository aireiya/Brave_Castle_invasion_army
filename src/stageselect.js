//stageselect.js

var color = cc.color(100, 50, 50, 128);
var color02 = cc.color(255, 0, 255, 128);
var color03 = cc.color(100, 100, 100, 50);

var select = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //var label = cc.LabelTTF.create("GameOver", "Arial", 40);
        //label.setPosition(size.width / 2, size.height / 2);
        //this.addChild(label, 1);

        //森の背景
        var background = new cc.Sprite(res.background09_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(2);
        this.addChild(backgroundLayer);

        //ステージ選択
        label01 = cc.LabelTTF.create("ステージ選択", "Arial", 40);
        label01.setColor(255,255,255);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width * 0.5,size.height * 0.8, 15);

        //ステージ１
        stage01 = cc.LabelTTF.create("ステージ1", "Arial", 30);
        stage01.setColor(255,255,255);
        this.addChild(stage01); //文字つける時はこっち*/
        stage01.setPosition(size.width * 0.2,size.height * 0.6, 15);

        //ステージ2
        stage02 = cc.LabelTTF.create("ステージ2", "Arial", 30);
        stage02.setColor(color);
        this.addChild(stage02); //文字つける時はこっち*/
        stage02.setPosition(size.width * 0.5,size.height * 0.6, 15);

        //ステージ3
        stage03 = cc.LabelTTF.create("ステージ3", "Arial", 30);
        stage03.setColor(color03);
        this.addChild(stage03); //文字つける時はこっち*/
        stage03.setPosition(size.width * 0.8,size.height * 0.6, 15);

        /*
        //ステージ4
        stage04 = cc.LabelTTF.create("ステージ4", "Arial", 30);
        stage04.setColor(color03);
        this.addChild(stage04); //文字つける時はこっち
        stage04.setPosition(size.width * 0.4,size.height * 0.4, 15);

        //ステージ5
        stage05 = cc.LabelTTF.create("ステージ5", "Arial", 30);
        stage05.setColor(color03);
        this.addChild(stage05); //文字つける時はこっち
        stage05.setPosition(size.width * 0.7,size.height * 0.4, 15);
        */

        //ステージ選んで
        label03 = cc.LabelTTF.create("<ステージを選ぶのです", "Arial", 25);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.2, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width / 5, size.height * 0.15);
        this.addChild(drop01);

        //ユニット強化
        unit = cc.LabelTTF.create("ユニット強化へ", "Arial", 30);
        unit.setColor(color02);
        this.addChild(unit); //文字つける時はこっち*/
        unit.setPosition(size.width * 0.8,size.height * 0.1, 15);

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
        if(touch.getLocation().x < 300 && touch.getLocation().y < 200 && touch.getLocation().x > 175 && touch.getLocation().y > 180 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);

          cc.director.runScene(new gameScene());
        }
        if(touch.getLocation().x < 500 && touch.getLocation().y < 50 && touch.getLocation().x > 290 && touch.getLocation().y > 20 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          cc.director.runScene(new PowerSelectScene());
        }
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new PowerSelectScene());
      },
});

var StageSelectScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new select();
        this.addChild(layer1);
    }
});
