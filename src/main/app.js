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

var unitx01 = 0;

var unitArray01 = [];
var unitArray01x = [];
var array01 = 0;
var unitLayer;
var array01i = 0;

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
    camp01.addChild(cart, 0);
    cart.setPosition(0, 150);

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

//----------戦闘エフェクト
    kemuri = cc.Layer.create();
    this.addChild(kemuri);
    cart = cc.Sprite.create(res.kemuri_png );
    kemuri.addChild(cart, 0);
    cart.setPosition(190, 70);

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
    /*if(moveon02 == 1){
      otomo02x += 1;
      otomo02.setPosition(otomo02x, otomo01y);
      //console.log(otomo02x);
    }*/

    upcos++;
    if(upcos == 50){
      copoint++;
      cost02.setString("所持コスト:" + copoint);
      upcos = 0;
    }
    /*★★★ユニット処理案件★★★
    0,クリックしたら任意のレーンにユニットが出るように。
    1,配列2個作って、ユニット出した時に配列１にユニットの種類を格納。配列２にHP格納。
    2,配列１から戦闘しているユニットの種類を持ってきて、配列２のHPを削る。
    3,配列２のHPが0になったら配列１から消して、ユニット画像も消す。
    4,再配置する時には、配列１の初めから調べて、空いているところを使う。
    5,updateで、配列に入っているユニットを順々に座標いじって進軍させる。
    6,あたり判定で射程を処理する。
    7,戦闘中は配列１から、どれが戦闘しているのか読み取ってくる。*/

    //console.log("あっぷでーと");
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
    var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
    sprite.setPosition(100, otomo01y);
    unitArray01x.push(100);
    unitArray01.push(sprite);

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

      console.log(unitArray01[array01i ] + "いちー"　+ unitArray01x[array01i]);

      unitArray01[array01i].setPosition(unitArray01x[array01i ], otomo01y);
      array01i ++;
    }
    else array01i  = 0;
  },
});
