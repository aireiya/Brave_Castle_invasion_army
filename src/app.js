var itemsLayer;
var cart;
var xSpeed = 0; //カートの移動速度

var detectedX;　 //現在タッチしているX座標
var savedX;　 //前回タッチしていたX座標
var touching = false;　 //タッチ状況管理用flag

var unitup = 0;

var rane01;
var rane02;
var rane03;
var rane04;
var rane05;

var upcos = 0;;

var otomoset03;
var otomo01y = 230;
var otomo02y = 190;
var otomo03y = 150;
var otomo04y = 110;
var otomo05y = 70;

var otomo02x = 80;

var copoint = 110;

var moveon01 = 0;
var moveon02 = 0;
var moveon03 = 0;
var moveon04 = 0;
var moveon05 = 0;

var unitArray = [];
var unitLayer;

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);
var color03 = cc.color(0, 255, 0, 128);

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
    this.scheduleUpdate();

    //スプライトシート読み込み
    cache = cc.spriteFrameCache;
    cache.addSpriteFrames(res.unit_plist, res.unit_png);
    //cache.getSpriteFrame()

    unitLayer = cc.Layer.create();
    this.addChild(unitLayer);

    //森の背景
    var background = new cc.Sprite(res.background_png);
    var size = cc.director.getWinSize();
    background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
    var backgroundLayer = cc.Layer.create();
    backgroundLayer.addChild(background);
    background.setScale(2);
    this.addChild(backgroundLayer);

    //レーン画像
    unitrane01 = cc.Layer.create();
    this.addChild(unitrane01);
    cart = cc.Sprite.create(res.unit_rane_png );
    unitrane01.addChild(cart, 0);
    cart.setPosition(250, 150);

    //城画像
    shiro01 = cc.Layer.create();
    this.addChild(shiro01);
    cart = cc.Sprite.create(res.shiro01_png );
    shiro01.addChild(cart, 0);
    shiro01.setScale(0.2);
    cart.setPosition(1300, 250);

    //壁画像
    /*kabe01 = cc.Layer.create();
    this.addChild(kabe01);
    cart = cc.Sprite.create(res.kabe01_jpg );
    kabe01.addChild(cart, 0);
    //kabe01.setScale(0.4);
    cart.setPosition(200, 190);*/

    //前衛キャンプ
    camp01 = cc.Layer.create();
    this.addChild(camp01);
    cart = cc.Sprite.create(res.camp_png);
    camp01.addChild(cart, 0);
    cart.setPosition(0, 150);

    //拠点ゲージ
    csbar = cc.Layer.create();
    this.addChild(csbar);
    cart = cc.Sprite.create(res.caslebar_png );
    csbar.addChild(cart, 0);
    csbar.setScale(0.8);
    cart.setPosition(250, 310);

    //人画像
    brave_otomo01 = cc.Layer.create();
    this.addChild(brave_otomo01);
    brave01 = cc.Sprite.create(cache.getSpriteFrame("brave_otomo03_02"));
    brave_otomo01.addChild(brave01, 0);
    brave01.setPosition(150, 150);

    brave_otomo02 = cc.Layer.create();
    this.addChild(brave_otomo02);
    brave02 = cc.Sprite.create(cache.getSpriteFrame("brave_otomo01_02") );
    brave_otomo02.addChild(brave02, 0);
    brave02.setPosition(250, 110);

    brave_otomo02 = cc.Layer.create();
    this.addChild(brave_otomo02);
    cart = cc.Sprite.create(cache.getSpriteFrame("brave_otomo05_02") );
    brave_otomo02.addChild(cart, 0);
    cart.setPosition(210, 70);

    brave_otomo03 = cc.Layer.create();
    this.addChild(brave_otomo03);
    cart = cc.Sprite.create(cache.getSpriteFrame("brave_otomo04_02") );
    brave_otomo03.addChild(cart, 0);
    cart.setPosition(300, 110);

//--------リストのユニット
    unitbar = cc.Layer.create();
    this.addChild(unitbar);
    bar = cc.Sprite.create(res.unitbar_png );
    unitbar.addChild(bar, 0);
    bar.setPosition(240, 20);

//----------戦闘エフェクト
    kemuri = cc.Layer.create();
    this.addChild(kemuri);
    cart = cc.Sprite.create(res.kemuri_png );
    kemuri.addChild(cart, 0);
    cart.setPosition(190, 70);

//-----------隠してるやつ

    maou_otomo01 = cc.Layer.create();
    this.addChild(maou_otomo01);
    otomo01 = cc.Sprite.create(res.maou_otomo01_01 );
    maou_otomo01.addChild(otomo01, 0);
    otomo01.setPosition(100, otomo01y);
    maou_otomo01.setVisible(false);

    maou_otomo02 = cc.Layer.create();
    this.addChild(maou_otomo02);
    otomo02 = cc.Sprite.create(res.maou_otomo02_01 );
    maou_otomo02.addChild(otomo02, 0);
    otomo02.setPosition(100, otomo01y);
    maou_otomo02.setVisible(false);

    maou_otomo03 = cc.Layer.create();
    this.addChild(maou_otomo03);
    otomo03 = cc.Sprite.create(res.maou_otomo03_01 );
    maou_otomo03.addChild(otomo03, 0);
    otomo03.setPosition(100, otomo01y);
    maou_otomo03.setVisible(false);

    maou_otomo04 = cc.Layer.create();
    this.addChild(maou_otomo04);
    otomo04 = cc.Sprite.create(res.maou_otomo04_01 );
    maou_otomo04.addChild(otomo04, 0);
    otomo04.setPosition(100, otomo01y);
    maou_otomo04.setVisible(false);

    maou_otomo05 = cc.Layer.create();
    this.addChild(maou_otomo05);
    otomo05 = cc.Sprite.create(res.maou_otomo05_01 );
    maou_otomo05.addChild(otomo05, 0);
    otomo05.setPosition(100, otomo01y);
    maou_otomo05.setVisible(false);

//-----------コスト
cost02 = cc.LabelTTF.create("所持コスト:" + copoint, "Arial", 30);
cost02.setColor(color06);
this.addChild(cost02); //文字つける時はこっち*/
cost02.setPosition(size.width * 0.25,size.height * 0.8, 15);


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
    //--------------レーンリスト------------------
    if(touch.getLocation().x < 100 && touch.getLocation().x > 50  ){
      if(touch.getLocation().y > 220 && touch.getLocation().y < 240){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
      switch(unitup){
        case 1:
        console.log("しょーかん1ユニ");
        copoint = copoint - 10;
        cost02.setString("所持コスト:" + copoint);
        //maou_otomo01.setVisible(true);
        //otomoset01 = 1;
        addunit();

        unitup = 0;
        break;

        case 2:
        console.log("しょーかん2ユニ");
        copoint = copoint - 20;
        cost02.setString("所持コスト:" + copoint);
        maou_otomo02.setVisible(true);
        moveon02 = 1;
        //otomoset02 = 1;
        unitup = 0;
        break;

        case 3:
        console.log("しょーかん3ユニ");
        copoint = copoint - 30;
        cost02.setString("所持コスト:" + copoint);
        maou_otomo03.setVisible(true);
        //otomoset03 = 1;
        unitup = 0;
        moveon03 = 1;
        break;

        case 4:
        console.log("しょーかん4ユニ");
        copoint = copoint - 40;
        cost02.setString("所持コスト:" + copoint);
        maou_otomo04.setVisible(true);
        //otomoset04 = 1;
        unitup = 0;
        moveon04 = 1;
        break;

        case 5:
        console.log("しょーかん2ユニ");
        copoint = copoint - 50;
        cost02.setString("所持コスト:" + copoint);
        maou_otomo05.setVisible(true);
        //otomoset05 = 1;
        unitup = 0;
        moveon05 = 1;
        break;
        }
      }
    }
//-------------------ユニットリスト-------------------
//y軸固定
      if( touch.getLocation().y < 37 &&  touch.getLocation().y > 0){

        //--------------ユニット1--------------
        if(touch.getLocation().x < 99 && touch.getLocation().x > 5 ){   console.log("たっちセカンド1ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
          unitup = 1;
        }
        //--------------ユニット2--------------
        if(touch.getLocation().x < 193 && touch.getLocation().x > 100 ){  console.log("たっちセカンド2ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
          unitup = 2;
        }
        //--------------ユニット3--------------
        if(touch.getLocation().x < 285 && touch.getLocation().x > 194 ){  console.log("たっちセカンド3ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
          unitup = 3;
        }
        //--------------ユニット4--------------
        if(touch.getLocation().x < 380 && touch.getLocation().x > 286 ){  console.log("たっちセカンド4ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
          unitup = 4;
        }
        //--------------ユニット5--------------
        if(touch.getLocation().x < 475 && touch.getLocation().x > 381 ){  console.log("たっちセカンド5ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
          unitup = 5;
        }

      }

      //cc.director.runScene(new ResultScene());

    //return true;
  },
  onTouchMoved: function(touch, event) {},
  onTouchEnded: function(touch, event) {},

  //アップデート まだ未実装
  update: function(dt) {
    if(moveon02 == 1){
      otomo02x += 1;
      otomo02.setPosition(otomo02x, otomo01y);
      console.log(otomo02x);
    }

    upcos++;
    if(upcos == 50){
      copoint++;
      cost02.setString("所持コスト:" + copoint);
      upcos = 0;
    }

    //console.log("あっぷでーと");
  }
});
function addunit(/*row, col*/) {
  //var randomTile = Math.floor(Math.random() * tileTypes.length);

  var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
  unitLayer.addChild(sprite, 0);
  //sprite.val = randomTile;
  //unitLayer.addChild(sprite, 0);
  sprite.setPosition(100,otomo01x);
  //unitArray[row][col] = sprite; //タイルを管理する配列に格納
  console.log("うぉぉん");
}
