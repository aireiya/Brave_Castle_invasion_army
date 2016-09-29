//stageselect.js

var label03;

var power = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //var label = cc.LabelTTF.create("GameOver", "Arial", 40);
        //label.setPosition(size.width / 2, size.height / 2);
        //this.addChild(label, 1);

        //背景
        var background = new cc.Sprite(res.background06_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(1.5);
        this.addChild(backgroundLayer);

        //ユニット強化
        label01 = cc.LabelTTF.create("ユニット強化", "Arial", 40);
        label01.setColor(255,255,255);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width * 0.5,size.height * 0.9, 15);

        //ユニット1強化
        maou_unit01 = cc.Layer.create();
        this.addChild(maou_unit01);
        cart = cc.Sprite.create(res.maou_otomo01_01 );
        maou_unit01.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.75, 15);

        hosi01 = cc.Layer.create();
        this.addChild(hosi01);
        cart = cc.Sprite.create(res.kyouka00_png );
        hosi01.addChild(cart, 0);
        cart.setPosition(size.width * 0.4,size.height * 0.75, 15);

        //ユニット2強化
        maou_unit02 = cc.Layer.create();
        this.addChild(maou_unit02);
        cart = cc.Sprite.create(res.maou_otomo02_01 );
        maou_unit02.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.6, 15);

        hosi02 = cc.Layer.create();
        this.addChild(hosi02);
        cart = cc.Sprite.create(res.kyouka02_png );
        hosi02.addChild(cart, 0);
        cart.setPosition(size.width * 0.4,size.height * 0.6, 15);

        //ユニット3
        maou_unit03 = cc.Layer.create();
        this.addChild(maou_unit03);
        cart = cc.Sprite.create(res.maou_otomo03_01 );
        maou_unit03.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.45, 15);

        hosi03 = cc.Layer.create();
        this.addChild(hosi03);
        cart = cc.Sprite.create(res.kyouka04_png );
        hosi03.addChild(cart, 0);
        cart.setPosition(size.width * 0.4,size.height * 0.45, 15);

        //ユニット4
        maou_unit04 = cc.Layer.create();
        this.addChild(maou_unit04);
        cart = cc.Sprite.create(res.maou_otomo04_01 );
        maou_unit04.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.3, 15);

        hosi04 = cc.Layer.create();
        this.addChild(hosi04);
        cart = cc.Sprite.create(res.kyouka03_png );
        hosi04.addChild(cart, 0);
        cart.setPosition(size.width * 0.4,size.height * 0.3, 15);

        //ユニット5
        maou_unit05 = cc.Layer.create();
        this.addChild(maou_unit05);
        cart = cc.Sprite.create(res.maou_otomo05_01 );
        maou_unit05.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.15, 15);

        hosi05 = cc.Layer.create();
        this.addChild(hosi05);
        cart = cc.Sprite.create(res.kyouka05_png );
        hosi05.addChild(cart, 0);
        cart.setPosition(size.width * 0.4,size.height * 0.15, 15);





        //ステージ選んで
        label03 = cc.LabelTTF.create("クリアポイントで\nユニットを強化", "Arial", 25);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち
        label03.setPosition(size.width * 0.8,size.height * 0.3, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width * 0.7, size.height * 0.5);
        this.addChild(drop01);

        //ステージ5
        unit = cc.LabelTTF.create("ステージ選択へ", "Arial", 25);
        unit.setColor(255,255,255);
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
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new gameScene());
      },
});

var PowerSelectScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new power();
        this.addChild(layer1);
    }
});
