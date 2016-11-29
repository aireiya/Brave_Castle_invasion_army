var itemsLayer;
var cart;   //オブジェクト画像表示

var unitup = 0;   //ユニット画像保存変数

var poptime = 0;  //敵出現ディレイ
var upcos = 0;    //増加コストディレイ

var stagepop = 0; //ステージ変更時のユニット出現頻度調整

var emargency = 0;  //敵被攻撃レーン検知

//★ユニットレーン座標★
var otomo01y = 230;
var otomo02y = 190;
var otomo03y = 150;
var otomo04y = 110;
var otomo05y = 70;
//★--------------★

var copoint = 100;  //所持コスト

//◆ユニット配列◆
var unitArray01 = [];   //ユニット配列
var array01 = 0;  //ユニット配列保存変数
var unitLayer;    //ユニット召喚レイヤー
var array01i = -1; //ユニット配列回し変数
var raneY = 0;  //レーン位置保存1~5
var arraytrue = 0;  //出撃許可変数
var scene_Un = false;
//◆----------◆

var addunit;

var enemyCS = 100;
var enemyDM = 0;
var ENBpos = 0;

var timer = 0;
var timerm = 0;

var change = 0;
var sept = 0; //敵城への攻撃頻度

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);
var color03 = cc.color(0, 255, 0, 128);

var enemyunit;

var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    gameLayer = new game();
    gameLayer.init();
    this.addChild(gameLayer);

    otomounit = new addunit();
    otomounit.init();
    this.addChild(otomounit);

    enemyunit = new Enemyunit();
    enemyunit.init();
    this.addChild(enemyunit);

    attackLayer = new attack();
    attackLayer.init();
    this.addChild(attackLayer);

  }
});


var game = cc.Layer.extend({
  ctor: function(){
    this._super();
    switch (stage) {
      case 1:
        cc.eventManager.addListener(listener, this);
        break;
      case 2:
        cc.eventManager.addListener(listener02, this);
        break;
      case 2:
        cc.eventManager.addListener(listener03, this);
        break;

    }
  },
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));
    this.schedule(this.update, 0.5);

    //■■■■■初期化数値■■■■■■■■■■■■■■■■■■■■■■■■■■

    copoint = 100;
    timer = 0;
    //味方ユニット系
    enemyCS = 100;
    unitArray01 = [];
    array01 = 0;
    unitup = 0;
    array01i = -1;
    arraytrue = 0;
    ENBpos = 0;
    raneY = 0;
    scene_Un = false;
    //敵ユニット系
    playerCS = 100;
    enemyArray = [];
    ensuu = 0;
    enarrayI = -1;
    enemyup = 0;
    PLBpos = 0;
    change_E = 0;

    //スプライトシート読み込み
    cache = cc.spriteFrameCache;
    cache.addSpriteFrames(res.unit_plist, res.unit_png);
    //cache.getSpriteFrame()

    //ユニット召喚レイヤー
    unitLayer = cc.Layer.create();
    this.addChild(unitLayer);

    //BGM
    //audioEngine.stopMusic();//前BGMの停止(このプログラムが最初に読まれば場合は消す)
    //音楽再生エンジン
    audioEngine = cc.audioEngine;

    if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.main_mp3 , true);
    }

    //SE登録
    //audioEngine.preloadEffect(res.at01_mp3);

    //森の背景
    switch (stage) {
      case 1:
        var background = new cc.Sprite(res.backgroundst1_png);
        stagepop = 5;
        break;
      case 2:
        var background = new cc.Sprite(res.backgroundst2_png);
        stagepop = 3;
        break;
      case 3:
        var background = new cc.Sprite(res.backgroundst3_png);
        console.log("ステージ3");
        stagepop = 1;
        break;
    }
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
    shiro01.addChild(cart, 1);
    shiro01.setScale(0.2);
    cart.setPosition(1300, 250);

    //前衛キャンプ
    camp01 = cc.Layer.create();
    this.addChild(camp01);
    cart = cc.Sprite.create(res.camp_png);
    camp01.addChild(cart, 1);
    cart.setPosition(-20, 150);

    //出撃アイコン
    gorane = cc.Layer.create();
    this.addChild(gorane);
    go = cc.Sprite.create(res.go_png );
    unitrane01.addChild(go, 2);
    go.setPosition(70, 150);
    go.setVisible(false);


    //拠点ゲージ背景
    csbar = cc.Layer.create();
    this.addChild(csbar);
    cart = cc.Sprite.create(res.caslebar02_png );
    csbar.addChild(cart, 2);
    //csbar.setScale(0.8);
    cart.setPosition(size.width * 0.5, 290);

    //自軍HP
    PLbar = cc.Layer.create();
    this.addChild(PLbar);
    pl = cc.Sprite.create(res.PL_png );
    PLbar.addChild(pl, 3);
    pl.setAnchorPoint(1,0.5);
    //PLbar.setScaleX(0.8);
    pl.setPosition(188, 290);

    //敵軍HP
    ENbar = cc.Layer.create();
    this.addChild(ENbar);
    en = cc.Sprite.create(res.EN_png );
    ENbar.addChild(en, 3);
    en.setAnchorPoint(0,0);
    //ENbar.setScale(0.8);
    en.setPosition(294, 280);

    //拠点ゲージ
    csbar = cc.Layer.create();
    this.addChild(csbar);
    cart = cc.Sprite.create(res.caslebar_png );
    csbar.addChild(cart, 4);
    //csbar.setScale(0.8);
    cart.setPosition(size.width * 0.5, 290);

    //コスト背景
    csbar = cc.Layer.create();
    this.addChild(csbar);
    cart = cc.Sprite.create(res.background18_png);
    csbar.addChild(cart, 4);
    cart.setPosition(size.width * 0.19, size.height * 0.8);

    //タイマー背景
    timerb = cc.Layer.create();
    this.addChild(timerb);
    cart = cc.Sprite.create(res.tm_png );
    timerb.addChild(cart, 5);
    //csbar.setScale(0.8);
    timerb.setPosition(size.width * 0.54, 290);

//--------リストのユニット
    unitbar = cc.Layer.create();
    this.addChild(unitbar);
    bar = cc.Sprite.create(res.unitbar_png );
    unitbar.addChild(bar, 5);
    bar.setPosition(240, 20);

//-------出撃禁止アイコン
    nounit = cc.Layer.create();
    this.addChild(nounit);
    no01 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no01, 6);
    no01.setPosition(50, 20);
    no01.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no02 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no02, 6);
    no02.setPosition(140, 20);
    no02.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no03 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no03, 6);
    no03.setPosition(235, 20);
    no03.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no04 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no04, 6);
    no04.setPosition(330, 20);
    no04.setVisible(false);

    nounit = cc.Layer.create();
    this.addChild(nounit);
    no05 = cc.Sprite.create(res.batu_png );
    nounit.addChild(no05, 6);
    no05.setPosition(420, 20);
    no05.setVisible(false);

//----------戦闘エフェクト
    kemuri = cc.Layer.create();
    this.addChild(kemuri);
    kemu = cc.Sprite.create(res.kemuri_png );
    kemuri.addChild(kemu, 7);
    kemu.setPosition(430, 200);
    kemu.setVisible(false);

    kemuri02 = cc.Layer.create();
    this.addChild(kemuri02);
    kemu02 = cc.Sprite.create(res.kemuri_png );
    kemuri02.addChild(kemu02, 7);
    kemu02.setPosition(400, 120);
    kemu02.setVisible(false);

    kemuri03 = cc.Layer.create();
    this.addChild(kemuri03);
    kemu03 = cc.Sprite.create(res.kemuri_png );
    kemuri03.addChild(kemu03, 7);
    kemu03.setPosition(460, 160);
    kemu03.setVisible(false);


//-----------コスト
cost02 = cc.LabelTTF.create("所持コスト:" + copoint, "Arial", 25);
cost02.setColor(color06);
this.addChild(cost02); //文字つける時はこっち*/
cost02.setPosition(size.width * 0.19,size.height * 0.8, 15);

//-----------コスト
txtime = cc.LabelTTF.create("経過", "Arial", 23);
txtime.setColor(color02);
this.addChild(txtime); //文字つける時はこっち*/
txtime.setPosition(size.width * 0.52,size.height * 0.94, 15);

ovtime = cc.LabelTTF.create("0秒", "Arial", 23);
ovtime.setColor(color02);
this.addChild(ovtime); //文字つける時はこっち*/
ovtime.setPosition(size.width * 0.52,size.height * 0.87, 15);

    //return true;
    //cc.eventManager.addListener(listener, this);
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
    //♥♥♥♥♥♥敵出しランダム♥♥♥♥♥♥♥♥♥
    poptime++;
    //出現頻度変更、数値はschedule依存
    if(poptime == stagepop){
    var rand = Math.floor( Math.random() * 5+ 1 ) ;
    var rand2 = Math.floor( Math.random() * 5 + 1 ) ;
    //console.log("ランダム");

      //console.log("らんだむー");
      //console.log(rand);
      enemyup = rand;
      switch (rand2) {
        case 1: enraneY = otomo01y;
          break;
        case 2: enraneY = otomo02y;
          break;
        case 3: enraneY = otomo03y;
          break;
        case 4: enraneY = otomo04y;
          break;
        case 5: enraneY = otomo05y;
          break;
    }
//エネミー被攻撃検知、被攻撃レーンにエネミー出現
    if(emargency != 0){
      enraneY = emargency;
      emargency = 0;
    }
    enemyunit.enItem();
    poptime = 0;
  }
    //♥♥♥♥♥♥敵出しランダム終わり♥♥♥♥♥♥♥♥♥
//--------時間毎コストアップ(0.5秒周期)
      copoint++;
      cost02.setString("所持コスト:" + copoint);
    //タイマー
    timerm++;
    if(timerm == 2){
      timer++;
      ovtime.setString("" + timer　+ "秒");
      timerm = 0;
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

      var unit = new Unit();
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
      var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
      //スプライトフレームを作成
          var frame0 = cache.getSpriteFrame("maou_otomo01_01");
          var frame1 = cache.getSpriteFrame("maou_otomo01_02");
          var frame2 = cache.getSpriteFrame("maou_otomo01_03");
          sprite_p.hpP = hp_U01;
          sprite_p.atk = pow_U01;
        break;

      case 2:
          var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo02_01"));
          var frame0 = cache.getSpriteFrame("maou_otomo02_01");
          var frame1 = cache.getSpriteFrame("maou_otomo02_02");
          var frame2 = cache.getSpriteFrame("maou_otomo02_03");
          sprite_p.hpP = hp_U02;
          sprite_p.atk = pow_U02;
        break;

      case 3:
          var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo03_01"));
          var frame0 = cache.getSpriteFrame("maou_otomo03_01");
          var frame1 = cache.getSpriteFrame("maou_otomo03_02");
          var frame2 = cache.getSpriteFrame("maou_otomo03_03");
          sprite_p.hpP = hp_U03;
          sprite_p.atk = pow_U03;
        break;

      case 4:
          var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo04_01"));
          var frame0 = cache.getSpriteFrame("maou_otomo04_01");
          var frame1 = cache.getSpriteFrame("maou_otomo04_02");
          var frame2 = cache.getSpriteFrame("maou_otomo04_03");
          sprite_p.hpP = hp_U04;
          sprite_p.atk = pow_U04;
        break;

      case 5:
          var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo05_01"));
          var frame0 = cache.getSpriteFrame("maou_otomo05_01");
          var frame1 = cache.getSpriteFrame("maou_otomo05_02");
          var frame2 = cache.getSpriteFrame("maou_otomo05_03");
          sprite_p.hpP = hp_U05;
          sprite_p.atk = pow_U05;
        break;
}

    //var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
    //console.log("Y座標" + raneY);
    sprite_p.setPosition(50, raneY);
    sprite_p.numberP = array01;
    sprite_p.attackP = false;
    sprite_p.deth = false;

    //------アニメーションの追加
        var animationframe = [];

          //for (z = 0; z < 2; z++) {
            //スプライトフレームを配列に登録
            //animationframe.push("frame" + z);
            animationframe.push(frame0);
            animationframe.push(frame1);
            animationframe.push(frame2);
          //}
        //スプライトフレームの配列を連続再生するアニメーションの定義
        var animation = new cc.Animation(animationframe, 0.2);
        //永久ループのアクションを定義
        var action = new cc.RepeatForever(new cc.animate(animation));
        //実行
        sprite_p.runAction(action);
    //-------アニメーションの追加おわり

    unitArray01.push(sprite_p);
    go.setVisible(false);


    this.addChild(sprite_p);
    array01++;

    this.schedule(this.update, 0.025);

  },
  //-------アップデート--------
  update: function(dt) {

if(unitArray01.length > 0){
  if(array01i < 0){
    //console.log("ユニット長さ" + unitArray01.length);
    array01i = unitArray01.length -1;
  }
    //ユニット配列
    if(array01i >= 0){

      if(unitArray01[array01i].attackP == false){
        //移動速度変更
        unitArray01[array01i].setPositionX(unitArray01[array01i].getPositionX() + 1);

//----------------↓ユニット攻城HPへらし↓-------
        if(unitArray01[array01i].getPositionX() > 380　&& unitArray01[array01i].deth == false){
          unitArray01[array01i].setPositionX(380);
          emargency = unitArray01[array01i].getPositionY();

          //敵城ポジション400で止まる
          kemu.setVisible(true);
          kemu02.setVisible(true);
          kemu03.setVisible(true);

          enemyDM++;
            if(enemyDM > 10){
              sept++;
              if(change == 0 && sept == 2){
                audioEngine.playEffect(res.at01_mp3);
                sept = 0;
            }

              enemyCS--;
              enemyDM = 0;
              ENBpos++;
              var size = ENbar.getContentSize();
              ENbar.setScaleX(enemyCS / 100);
              ENbar.setContentSize(cc.size(ENbar.width, size.height));
              //ENbar.ignoreAnchorPointForPosition(false);
              //console.log(ENbar.getPositionX());
              //コンテンツサイズで画像更新
              //アンカーポイント0,0でやる
              //イグノリアフォアアンカーポジション 常にtrue アンカーポイントを無効化 falseで治るかも
              if(enemyCS < 20){
                switch (stage) {
                  case 1:
                    stage_S02 = true;
                    break;
                  case 1:
                    stage_S03 = true;
                    break;

                }
                scene_Un = true;
                var a = cc.TransitionFade.create(2.0, new ResultScene());
                change = 1;
                cc.director.runScene(a);
              }
            }
        }
      }
      array01i --;
    }
  }

  },
});
