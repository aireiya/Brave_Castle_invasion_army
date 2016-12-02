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
var arraytrue = false;  //出撃許可変数
var scene_Un = false;

//◆----------◆

var addunit;

var enemyCS = 100;
var enemyDM = 0;
var ENBpos = 0;

var timer = 0;
var timerm = 0;

var change = 0;

var color = cc.color(255, 0, 0, 128);
var color02 = cc.color(255, 0, 255, 128);
var color03 = cc.color(0, 255, 0, 128);

var enemyunit;

//エフェクト
var E_efect01;
var E_efect02;
var E_efect03;

var U_efect01;
var U_efect02;
var U_efect03;

//SE
var change = false;

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
  init: function() {
    this._super();
    //グラデーション背景
    //  var backgroundLayer = cc.LayerGradient.create(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));
    this.schedule(this.update, 0.5);

    //■■■■■初期化数値■■■■■■■■■■■■■■■■■■■■■■■■■■

    copoint = 100;
    timer = 0;
    change = false;
    //味方ユニット系
    enemyCS = 100;
    unitArray01 = [];
    array01 = 0;
    unitup = 0;
    array01i = -1;
    arraytrue = false;
    ENBpos = 0;
    raneY = 0;
    scene_Un = false;
    //敵ユニット系
    playerCS = 100;
    enemyArray = [];
    ensuu = 0;
    enarrayI = -1;
    enemyup = 0;
    change_E = 0;
    poptime = 0;

    //スプライトシート読み込み
    cache = cc.spriteFrameCache;
    cache.addSpriteFrames(res.unit_plist, res.unit_png);
    //cache.getSpriteFrame()

    //ユニット召喚レイヤー
    unitLayer = cc.Layer.create();
    this.addChild(unitLayer);

    //BGM
    audioEngine.stopMusic();//前BGMの停止(このプログラムが最初に読まれば場合は消す)
    //音楽再生エンジン
    audioEngine = cc.audioEngine;

    if (!audioEngine.isMusicPlaying()) {
      //audioEngine.playMusic("res/bgm_main.mp3", true);
      audioEngine.playMusic(res.main_mp3 , true);
    }

    //森の背景
    switch (stage) {
      case 1:
        var background = new cc.Sprite(res.backgroundst1_png);
        stagepop = 5;
        break;
      case 2:
        var background = new cc.Sprite(res.backgroundst2_png);
        console.log("ステージ2");
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


//-----------コスト
cost02 = cc.LabelTTF.create("所持コスト:" + copoint, "Arial", 25);
cost02.setColor(color06);
this.addChild(cost02); //文字つける時はこっち*/
cost02.setPosition(size.width * 0.19,size.height * 0.8, 15);

//-----------コスト
txtime = cc.LabelTTF.create("経過", "Arial", 25);
txtime.setColor(color02);
this.addChild(txtime); //文字つける時はこっち*/
txtime.setPosition(size.width * 0.5,size.height * 0.94, 15);

ovtime = cc.LabelTTF.create("0秒", "Arial", 25);
ovtime.setColor(color02);
this.addChild(ovtime); //文字つける時はこっち*/
ovtime.setPosition(size.width * 0.5,size.height * 0.87, 15);

      ////■■■■■城エフェクト追加■■■■■■■■■■■■■■■■■■■■■■■■■■
      E_efect01 = new cc.ParticleSystem(res.fire);
      E_efect01.setPosition(1000,size.height * 0.9 );
      this.addChild(E_efect01, 20);
      E_efect01.setAutoRemoveOnFinish(true);

      E_efect02 = new cc.ParticleSystem(res.fire);
      E_efect02.setPosition(1000,size.height * 0.8 );
      this.addChild(E_efect02, 20);
      E_efect02.setAutoRemoveOnFinish(true);

      E_efect03 = new cc.ParticleSystem(res.fire);
      E_efect03.setPosition(1000,size.height * 0.7 );
      this.addChild(E_efect03, 20);
      E_efect03.setAutoRemoveOnFinish(true);

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
  if(touch.getLocation().x < 100 && touch.getLocation().x > 50 && scene_Un == false && unitup != 0){
    if(touch.getLocation().y > 220 && touch.getLocation().y < 240){
      raneY = otomo01y;
      //console.log("レーン1");
      arraytrue = true;
    }
    if(touch.getLocation().y > 180 && touch.getLocation().y < 200){
      raneY = otomo02y;
      //console.log("レーン2");
      arraytrue = true;
    }
    if(touch.getLocation().y > 140 && touch.getLocation().y < 160){
      raneY = otomo03y;
      //console.log("レーン3");
      arraytrue = true;
    }
    if(touch.getLocation().y > 100 && touch.getLocation().y < 120){
      raneY = otomo04y;
      //console.log("レーン4");
      arraytrue = true;
    }
    if(touch.getLocation().y > 60 && touch.getLocation().y < 80){
      raneY = otomo05y;
      //console.log("レーン5");
      arraytrue = true;
    }

    //console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
    if(arraytrue == true){
    switch(unitup){
      case 1:
      //console.log("しょーかん1ユニ");
      copoint = copoint - 10;
      break;

      case 2:
      //console.log("しょーかん2ユニ");
      copoint = copoint - 20;
      break;

      case 3:
      //console.log("しょーかん3ユニ");
      copoint = copoint - 30;
      break;

      case 4:
      //console.log("しょーかん4ユニ");
      copoint = copoint - 40;
      break;

      case 5:
      //console.log("しょーかん2ユニ");
      copoint = copoint - 50;
      break;

    }
    cost02.setString("所持コスト:" + copoint);
    otomounit.addItem();
    unitup = 0;
    arraytrue = false;
    //エフェクト
    audioEngine.playEffect(res.se07_mp3);
  }
  }
//-------------------ユニットリスト-------------------
//y軸固定
    if( touch.getLocation().y < 37 &&  touch.getLocation().y > 0){


      //--------------ユニット1--------------
      if(touch.getLocation().x < 99 && touch.getLocation().x > 5 && copoint >= 10 ){
        //console.log("たっちセカンド1ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 1;
        go.setVisible(true);
      }
      //--------------ユニット2--------------
      if(touch.getLocation().x < 193 && touch.getLocation().x > 100 && copoint >= 20 ){
        //console.log("たっちセカンド2ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 2;
        go.setVisible(true);
      }
      //--------------ユニット3--------------
      if(touch.getLocation().x < 285 && touch.getLocation().x > 194 && copoint >= 30 ){
        //console.log("たっちセカンド3ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 3;
        go.setVisible(true);
      }
      //--------------ユニット4--------------
      if(touch.getLocation().x < 380 && touch.getLocation().x > 286 && copoint >= 40 ){
        //console.log("たっちセカンド4ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 4;
        go.setVisible(true);
      }
      //--------------ユニット5--------------
      if(touch.getLocation().x < 475 && touch.getLocation().x > 381 && copoint >= 50 ){
        //console.log("たっちセカンド5ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 5;
        go.setVisible(true);
      }
      //エフェクト
      audioEngine.playEffect(res.se08_mp3);
    }

    //cc.director.runScene(new ResultScene());

  //return true;
},
onTouchMoved: function(touch, event) {},
onTouchEnded: function(touch, event) {},


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
    //■■■■■■敵出しランダム■■■■■■■■■■■■■■■
    poptime++;
    //出現頻度変更、数値はschedule依存
    if(poptime >= stagepop){
    var rand = Math.floor( Math.random() * 5+ 1 ) ;
    var rand2 = Math.floor( Math.random() * 5 + 1 ) ;
    console.log("敵出現");
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
    //■■■■■■敵出しランダム終わり■■■■■■■■■■■■■■■■■■
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
  winsize: null,
 ctor: function() {
   this._super();
   this.winsize = cc.director.getWinSize();
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
         sprite_p.attackP = false;
         sprite_p.deth = false;
       break;

     case 2:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo02_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo02_01");
         var frame1 = cache.getSpriteFrame("maou_otomo02_02");
         var frame2 = cache.getSpriteFrame("maou_otomo02_03");
         sprite_p.hpP = hp_U02;
         sprite_p.atk = pow_U02;
         sprite_p.attackP = false;
         sprite_p.deth = false;
       break;

     case 3:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo03_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo03_01");
         var frame1 = cache.getSpriteFrame("maou_otomo03_02");
         var frame2 = cache.getSpriteFrame("maou_otomo03_03");
         sprite_p.hpP = hp_U03;
         sprite_p.atk = pow_U03;
         sprite_p.attackP = false;
         sprite_p.deth = false;
       break;

     case 4:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo04_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo04_01");
         var frame1 = cache.getSpriteFrame("maou_otomo04_02");
         var frame2 = cache.getSpriteFrame("maou_otomo04_03");
         sprite_p.hpP = hp_U04;
         sprite_p.atk = pow_U04;
         sprite_p.attackP = false;
         sprite_p.deth = false;
       break;

     case 5:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo05_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo05_01");
         var frame1 = cache.getSpriteFrame("maou_otomo05_02");
         var frame2 = cache.getSpriteFrame("maou_otomo05_03");
         sprite_p.hpP = hp_U05;
         sprite_p.atk = pow_U05;
         sprite_p.attackP = false;
         sprite_p.deth = false;
       break;
}

   //var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
   //console.log("Y座標" + raneY);
   //sprite_p.numberP = array01;
   //sprite_p.attackP = false;
   //sprite_p.deth = false;

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

   sprite_p.setPosition(50, raneY);
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

         enemyDM++;
           if(enemyDM > 10){
             if(change == false){
               //エフェクト
               audioEngine.playEffect(res.se05_mp3);
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

             switch (unitArray01[array01i].getPositionY()) {
               case 230:
                 Particle01.setPosition(unitArray01[array01i].getPositionX(),otomo01y );
                 break;
               case 190:
                 Particle02.setPosition(unitArray01[array01i].getPositionX(),otomo02y );
                 break;
               case 150:
                 Particle03.setPosition(unitArray01[array01i].getPositionX(),otomo03y );
                 break;
               case 110:
                 Particle04.setPosition(unitArray01[array01i].getPositionX(),otomo04y );
                 break;
               case 70:
                 Particle05.setPosition(unitArray01[array01i].getPositionX(),otomo05y );
                 break;
             }

             if(enemyCS < 99){
               E_efect01.setPosition(this.winsize.width * 0.9,this.winsize.height * 0.5 );
             }
             if(enemyCS < 70){
               E_efect02.setPosition(this.winsize.width * 0.95,this.winsize.height * 0.6 );
             }
             if(enemyCS < 50){
               E_efect03.setPosition(this.winsize.width * 0.95,this.winsize.height * 0.45 );
             }

             if(enemyCS < 20){
               switch (stage) {
                 case 1:
                   stage_S02 = true;
                   break;
                 case 2:
                   stage_S03 = true;
                   break;

               }
               scene_Un = true;
               var a = cc.TransitionFade.create(2.0, new ResultScene());
               change = true;
               cc.director.runScene(a);
             }
           }
       }else{
       }
     }
     array01i --;
   }
 }

 },
});
