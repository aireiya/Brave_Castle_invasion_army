var itemsLayer;
var cart;
var xSpeed = 0; //カートの移動速度

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag

var unit01 = 0;
var unit02 = 0;
var unit03 = 0;
var unit04 = 0;
var unit05 = 0;

var rane01;
var rane02;
var rane03;
var rane04;
var rane05;

var otomoset03;
var otomo03x = 275;

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);
  }
});

var game = cc.Layer.extend({
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    this.addChild(backgroundLayer);

    //レーン画像
    unitrane01 = cc.Layer.create();
    this.addChild(unitrane01);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane01.addChild(cart, 0);
    cart.setPosition(250, 70);

    unitrane02 = cc.Layer.create();
    this.addChild(unitrane02);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane02.addChild(cart, 0);
    cart.setPosition(250, 120);

    unitrane03 = cc.Layer.create();
    this.addChild(unitrane03);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane03.addChild(cart, 0);
    cart.setPosition(250, 170);

    unitrane04 = cc.Layer.create();
    this.addChild(unitrane04);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane04.addChild(cart, 0);
    cart.setPosition(250, 220);

    unitrane05 = cc.Layer.create();
    this.addChild(unitrane05);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane05.addChild(cart, 0);
    cart.setPosition(250, 270);

    //城画像
    shiro01 = cc.Layer.create();
    this.addChild(shiro01);
    cart = cc.Sprite.create(res.shiro01_png );
    shiro01.addChild(cart, 0);
    shiro01.setScale(0.2);
    cart.setPosition(1300, 250);

    //壁画像
    kabe01 = cc.Layer.create();
    this.addChild(kabe01);
    cart = cc.Sprite.create(res.kabe01_jpg );
    kabe01.addChild(cart, 0);
    kabe01.setScale(0.4);
    cart.setPosition(600, 190);

    //前衛キャンプ
    //壁画像
    camp01 = cc.Layer.create();
    this.addChild(camp01);
    cart = cc.Sprite.create(res.camp_png);
    camp01.addChild(cart, 0);
    camp01.setScale(0.2);
    cart.setPosition(-700, 250);

    //ユニットボックス
    unitbox01 = cc.Layer.create();
    this.addChild(unitbox01);
    cart = cc.Sprite.create(res.unit_box_png );
    unitbox01.addChild(cart, 0);
    unitbox01.setScale(1);
    cart.setPosition(250, 20);

    //人画像
    brave_otomo01 = cc.Layer.create();
    this.addChild(brave_otomo01);
    cart = cc.Sprite.create(res.brave_otomo01_01 );
    brave_otomo01.addChild(cart, 0);
    cart.setPosition(240, 170);

    brave_otomo02 = cc.Layer.create();
    this.addChild(brave_otomo02);
    cart = cc.Sprite.create(res.brave_otomo02_01 );
    brave_otomo02.addChild(cart, 0);
    cart.setPosition(200, 70);

    //モンスター画像
    maou_otomo01 = cc.Layer.create();
    this.addChild(maou_otomo01);
    cart = cc.Sprite.create(res.maou_otomo01_01 );
    maou_otomo01.addChild(cart, 0);
    cart.setPosition(180, 70);

    maou_otomo02 = cc.Layer.create();
    this.addChild(maou_otomo02);
    cart = cc.Sprite.create(res.maou_otomo02_01 );
    maou_otomo02.addChild(cart, 0);
    cart.setPosition(200, 170);

    maou_otomo03 = cc.Layer.create();
    this.addChild(maou_otomo03);
    otomo03 = cc.Sprite.create(res.maou_otomo02_01 );
    maou_otomo03.addChild(otomo03, 0);
    otomo03.setPosition(80, otomo03x);
    maou_otomo03.setVisible(false);


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
    //ヒントのクリック判定
    if(touch.getLocation().x < 90 && touch.getLocation().y < 280 && touch.getLocation().x > 70 && touch.getLocation().y > 270 ){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
      console.log(unit05);
      if(unit01 == 1 || unit02 == 1 || unit03 == 1 || unit04 == 1 || unit05 == 1){
        console.log("しょーかん");
        maou_otomo03.setVisible(true);
        otomoset03 = 1;

      }
    }

      if(touch.getLocation().x < 460 && touch.getLocation().y < 30 && touch.getLocation().x > 400 && touch.getLocation().y > 15){
        console.log("たっちセカンド" + touch.getLocation().x +" " + touch.getLocation().y);
        unit05 = 1;
      }
      //cc.director.runScene(new GameHintScene());

    return true;
  },
  onTouchMoved: function(touch, event) {},
  onTouchEnded: function(touch, event) {},

  //アップデート
  update: function(dt) {
    if(otomoset03 == 1){
      otomo03x += 5;
      otomo03.setPosition(80, otomo03x);
      console.log(otomo03x);
    }
  },
});
