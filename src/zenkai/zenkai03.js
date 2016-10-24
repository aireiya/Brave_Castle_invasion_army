//zenkai03.js

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);

var zenkai03 = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var drop01 = cc.Sprite.create(res.zenkai03_png);　
        drop01.setScale(0.5);
        drop01.setPosition(size.width * 0.5, size.height * 0.4);
        this.addChild(drop01);

        //遷移見出し
        label01 = cc.LabelTTF.create("前回のプレゼン3", "Arial", 40);
        label01.setColor(255,255,255);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width * 0.5,size.height * 0.9, 15);

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
        var a = cc.TransitionFade.create(2.0, new TitleScene());
        cc.director.runScene(a);
      },
});

var ZenkaiScene03 = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new zenkai03();
        this.addChild(layer1);
    }
});
