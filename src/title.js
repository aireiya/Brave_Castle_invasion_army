//title.js

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);
var color04 = cc.color(230, 100, 0, 128);
var color05 = cc.color(255, 30, 30, 128);
var color06 = cc.color(0, 0, 2550, 128);

var title = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //var label = cc.LabelTTF.create("GameOver", "Arial", 40);
        //label.setPosition(size.width / 2, size.height / 2);
        //this.addChild(label, 1);

        //------------BGM---------

        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          audioEngine.playMusic(res.title_mp3, true);
        }

        //SE登録
        //audioEngine.preloadEffect(res.at01_mp3);

        //森の背景
        var background = new cc.Sprite(res.background10_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(1);
        this.addChild(backgroundLayer);

        //ゲームオーバー
        label01 = cc.LabelTTF.create("勇者城侵攻軍！モックアップ", "Arial", 35);
        label01.setColor(color04);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width / 2,size.height * 0.8, 15);

        //リトライ？
        label02 = cc.LabelTTF.create("～魔王の息子のウサ晴らし～", "Arial", 35);
        label02.setColor(color04);
        this.addChild(label02); //文字つける時はこっち*/
        label02.setPosition(size.width / 2,size.height * 0.6, 15);

        //スタート
        label03 = cc.LabelTTF.create("<クリックでスタート", "Arial", 30);
        label03.setColor(color05);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.3, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width / 5, size.height * 0.25);
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
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        var a = cc.TransitionFade.create(2.0, new StageSelectScene());
        cc.director.runScene(a);
      },
});

var TitleScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new title();
        this.addChild(layer1);
    }
});
