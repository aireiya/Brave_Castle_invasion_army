//stageselect.js

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);

var result = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //var label = cc.LabelTTF.create("GameOver", "Arial", 40);
        //label.setPosition(size.width / 2, size.height / 2);
        //this.addChild(label, 1);

        //背景
        var background = new cc.Sprite(res.background08_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height * 0.65));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(0.7);
        this.addChild(backgroundLayer);

        //ゲームクリア
        var label01 = cc.LabelTTF.create("STAGE CLEAR!", "Arial", 40);
        label01.setColor(color);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width / 2,size.height * 0.8, 15);

        //攻略時間
        var label02 = cc.LabelTTF.create("攻略時間：110秒", "Arial", 30);
        label02.setColor(255,255,255);
        this.addChild(label02); //文字つける時はこっち*/
        label02.setPosition(size.width / 2,size.height * 0.6, 15);

        //YES NO
        var label03 = cc.LabelTTF.create("敵撃破数：52体", "Arial", 30);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち*/
        label03.setPosition(size.width / 2,size.height * 0.5, 15);

        //YES NO
        var label04 = cc.LabelTTF.create("残存拠点HP：80％", "Arial", 30);
        label04.setColor(255,255,255);
        this.addChild(label04); //文字つける時はこっち*/
        label04.setPosition(size.width / 2,size.height * 0.4, 15);

        //YES NO
        var label05 = cc.LabelTTF.create("ランク:A！", "Arial", 30);
        label05.setColor(color);
        this.addChild(label05); //文字つける時はこっち*/
        label05.setPosition(size.width * 0.7,size.height * 0.3, 15);

        //ランダムでしゃべるやつ
        label06 = cc.LabelTTF.create("<ランクに応じて一言物申しますよ", "Arial", 25);
        label06.setColor(255,255,255);
        this.addChild(label06); //文字つける時はこっち*/
        label06.setPosition(size.width * 0.6,size.height * 0.2, 15);

        //NEXT STAGE
        label07 = cc.LabelTTF.create("NEXT STAGE⇒", "Arial", 20);
        label07.setColor(color02);
        this.addChild(label07); //文字つける時はこっち*/
        label07.setPosition(size.width * 0.8,size.height * 0.06, 15);

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
        if(touch.getLocation().x < 460 && touch.getLocation().y < 30 && touch.getLocation().x > 310 && touch.getLocation().y > 10 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          cc.director.runScene(new StageSelectScene());
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
