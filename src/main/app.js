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

var unitx01 = 0;

var unitArray01 = [];
var unitArray01x = [];
var unitArray01y = [];
var array01 = 0;
var unitLayer;
var array01i = 0;
var raneY = 0;

var addunit;
var unit;


var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);
var color03 = cc.color(0, 255, 0, 128);

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    otomounit = new addunit();
    otomounit.init();
    this.addChild(otomounit);

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

    //ユニット召喚レイヤー
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

    //前衛キャンプ
    camp01 = cc.Layer.create();
    this.addChild(camp01);
    cart = cc.Sprite.create(res.camp_png);
    camp01.addChild(cart, -1);
    cart.setPosition(-20, 150);

    //出撃アイコン
    gorane = cc.Layer.create();
    this.addChild(gorane);
    go = cc.Sprite.create(res.go_png );
    unitrane01.addChild(go, 1);
    go.setPosition(70, 150);
    go.setVisible(false);

    //拠点ゲージ
    csbar = cc.Layer.create();
    this.addChild(csbar);
    cart = cc.Sprite.create(res.caslebar_png );
    csbar.addChild(cart, 0);
    csbar.setScale(0.8);
    cart.setPosition(250, 310);


//--------リストのユニット
    unitbar = cc.Layer.create();
    this.addChild(unitbar);
    bar = cc.Sprite.create(res.unitbar_png );
    unitbar.addChild(bar, 0);
    bar.setPosition(240, 20);

//-------出撃禁止アイコン
    nounit = cc.Layer.create();
    this.addChild(nounit);
    no01 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no01, 0);
    no01.setPosition(50, 20);
    no01.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no02 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no02, 0);
    no02.setPosition(140, 20);
    no02.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no03 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no03, 0);
    no03.setPosition(235, 20);
    no03.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no04 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no04, 0);
    no04.setPosition(330, 20);
    no04.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no05 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no05, 0);
    no05.setPosition(420, 20);
    no05.setVisible(false);

//----------戦闘エフェクト
    /*kemuri = cc.Layer.create();
    this.addChild(kemuri);
    cart = cc.Sprite.create(res.kemuri_png );
    kemuri.addChild(cart, 0);
    cart.setPosition(190, 70);*/

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

    //return true;
    cc.eventManager.addListener(listener, this);
},


  //アップデート
  update: function(dt) {

//-------出撃可能判定
    if(copoint >= 50){
      no01.setVisible(false);
      no02.setVisible(false);
      no03.setVisible(false);
      no04.setVisible(false);
      no05.setVisible(false);
    }
      if(copoint < 50){
      no05.setVisible(true);
      no01.setVisible(false);
      no02.setVisible(false);
      no03.setVisible(false);
      no04.setVisible(false);
        if(copoint < 40){
        no04.setVisible(true);
        no01.setVisible(false);
        no02.setVisible(false);
        no03.setVisible(false);
          if(copoint < 30){
          no03.setVisible(true);
          no01.setVisible(false);
          no02.setVisible(false);
            if(copoint < 20){
            no02.setVisible(true);
            no01.setVisible(false);
              if(copoint < 10){
              no01.setVisible(true);
            }
          }
        }
      }
    }
//--------時間毎コストアップ
    upcos++;
    if(upcos == 50){
      copoint++;
      cost02.setString("所持コスト:" + copoint);
      upcos = 0;
    }

  },
});

//◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆gameおわり◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
//addunit.addItem();
 addunit = cc.Layer.extend({

   ctor: function(){
      this._super();
      //unit = new Unit();
      //this.addChild(unit);

     },
    addItem:function(){
      unit = new Unit();
      this.addChild(unit);
    },

});

var Unit = cc.Sprite.extend({
  ctor: function() {
    this._super();
    //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
    //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
    switch (unitup) {
      case 1:
          var sprite =  cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
        break;

      case 2:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo02_01"));
        break;

      case 3:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo03_01"));
        break;

      case 4:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo04_01"));
        break;

      case 5:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo05_01"));
        break;
}

    //var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
    console.log("Y座標" + raneY);
    sprite.setPosition(100, raneY);
    unitArray01x.push(100);
    unitArray01y.push(raneY);
    unitArray01.push(sprite);
    go.setVisible(false);

    this.addChild(unitArray01[array01]);
    console.log(unitArray01x.length);
    array01++;

    console.log("うぉぉん");

    this.scheduleUpdate();

  },
  //アイテムが生成された後、描画されるときに実行
  /*onEnter: function() {
    this._super();
    //レーン1の左から
    this.setPosition(100,otomo01y);
    //レーン1の右へ
    var moveAction = cc.MoveTo.create(400, otomo01y);
    this.runAction(moveAction);
    this.scheduleUpdate();
  },*/
  update: function(dt) {
    if(array01i < unitArray01.length){
      unitArray01x[array01i] = unitArray01x[array01i] + 1;

      //console.log(unitArray01[array01i ] + "いちー"　+ unitArray01x[array01i]);
      unitArray01[array01i].setPosition(unitArray01x[array01i], unitArray01y[array01i]);

        if(unitArray01[array01i].getPositionX() > 400){
          unitArray01[array01i].setPosition(400, unitArray01y[array01i]);
          //■ここに城HPを減らす処理をつける
        }
      array01i ++;
    }
    else array01i  = 0;

  },
});
