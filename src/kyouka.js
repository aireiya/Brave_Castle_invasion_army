//stageselect.js

var label03;
var point = 100;
var cpoint;

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

        //ユニット強化
        label02 = cc.LabelTTF.create("攻撃力\n体力", "Arial", 25);
        label02.setColor(color);
        this.addChild(label02); //文字つける時はこっち*/
        label02.setPosition(size.width * 0.57,size.height * 0.75, 15);

        //ユニット1強化
        maou_unit01 = cc.Layer.create();
        this.addChild(maou_unit01);
        tx01 = cc.Sprite.create(res.maou_otomo01_01 );
        maou_unit01.addChild(tx01, 0);
        tx01.setPosition(size.width * 0.1,size.height * 0.75, 15);

        hosi01 = cc.Layer.create();
        this.addChild(hosi01);
        powtx01 = cc.Sprite.create(res.powgauge02_png );
        hosi01.setScale(0.7);
        hosi01.addChild(powtx01, 0);
        powtx01.setPosition(size.width * 0.25,size.height * 0.92, 15);

        hp01 = cc.Layer.create();
        this.addChild(hp01);
        hptx01 = cc.Sprite.create(res.hpgauge01_png );
        hp01.setScale(0.7);
        hp01.addChild(hptx01, 0);
        hptx01.setPosition(size.width * 0.25,size.height * 0.82, 15);

        //ユニット2強化
        maou_unit02 = cc.Layer.create();
        this.addChild(maou_unit02);
        cart = cc.Sprite.create(res.maou_otomo02_01 );
        maou_unit02.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.6, 15);

        hosi02 = cc.Layer.create();
        this.addChild(hosi02);
        cart = cc.Sprite.create(res.powgauge03_png );
        hosi02.addChild(cart, 0);
        hosi02.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.7, 15);

        hp02 = cc.Layer.create();
        this.addChild(hp02);
        cart = cc.Sprite.create(res.hpgauge04_png );
        hp02.addChild(cart, 0);
        hp02.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.6, 15);

        //ユニット3
        maou_unit03 = cc.Layer.create();
        this.addChild(maou_unit03);
        cart = cc.Sprite.create(res.maou_otomo03_01 );
        maou_unit03.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.45, 15);

        hosi03 = cc.Layer.create();
        this.addChild(hosi03);
        cart = cc.Sprite.create(res.powgauge05_png );
        hosi03.addChild(cart, 0);
        hosi03.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.48, 15);

        hp03 = cc.Layer.create();
        this.addChild(hp03);
        cart = cc.Sprite.create(res.hpgauge03_png );
        hp03.addChild(cart, 0);
        hp03.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.38, 15);

        //ユニット4
        maou_unit04 = cc.Layer.create();
        this.addChild(maou_unit04);
        cart = cc.Sprite.create(res.maou_otomo04_01 );
        maou_unit04.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.3, 15);

        hosi04 = cc.Layer.create();
        this.addChild(hosi04);
        cart = cc.Sprite.create(res.powgauge02_png );
        hosi04.addChild(cart, 0);
        hosi04.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.26, 15);

        hp04 = cc.Layer.create();
        this.addChild(hp04);
        tx04 = cc.Sprite.create(res.hpgauge06_png );
        hp04.addChild(tx04, 0);
        hp04.setScale(0.7);
        tx04.setPosition(size.width * 0.25,size.height * 0.16, 15);

        //ユニット5
        maou_unit05 = cc.Layer.create();
        this.addChild(maou_unit05);
        cart = cc.Sprite.create(res.maou_otomo05_01 );
        maou_unit05.addChild(cart, 0);
        cart.setPosition(size.width * 0.1,size.height * 0.15, 15);

        hosi05 = cc.Layer.create();
        this.addChild(hosi05);
        cart = cc.Sprite.create(res.powgauge09_png );
        hosi05.addChild(cart, 0);
        hosi05.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * 0.04, 15);

        hp05 = cc.Layer.create();
        this.addChild(hp05);
        cart = cc.Sprite.create(res.hpgauge01_png );
        hp05.addChild(cart, 0);
        hp05.setScale(0.7);
        cart.setPosition(size.width * 0.25,size.height * -0.06, 15);





        //ステージ選んで
        label03 = cc.LabelTTF.create("クリアポイントで\nユニットを強化", "Arial", 25);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち
        label03.setPosition(size.width * 0.8,size.height * 0.3, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width * 0.7, size.height * 0.5);
        this.addChild(drop01);

        //ステージ選択へ
        unit = cc.LabelTTF.create("ステージ選択へ", "Arial", 25);
        unit.setColor(255,255,255);
        this.addChild(unit); //文字つける時はこっち*/
        unit.setPosition(size.width * 0.8,size.height * 0.1, 15);

        //クリアポイント
        cpoint = cc.LabelTTF.create("クリアポイント:" + point, "Arial", 25);
        cpoint.setColor(color06);
        this.addChild(cpoint); //文字つける時はこっち*/
        cpoint.setPosition(size.width * 0.8,size.height * 0.65, 15);

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
        if(touch.getLocation().x < 470 && touch.getLocation().y < 50 && touch.getLocation().x > 300 && touch.getLocation().y > 20 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          cc.director.runScene(new StageSelectScene());
        }
        if(touch.getLocation().x < 230 && touch.getLocation().y < 265 && touch.getLocation().x > 35 && touch.getLocation().y > 220 ){
          console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
          //cc.director.runScene(new StageSelectScene());
          powtx01.setTexture(res.powgauge03_png);
          hptx01.setTexture(res.hpgauge02_png);
          point = point - 30;
          cpoint.setString("クリアポイント:" + point);
        }
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new gameScene());
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
