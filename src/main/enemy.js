//◆敵ユニット配列◆
var enaddUnit;


var enemyArray = [];
var ensuu = 0;      //エネミー配列保存変数
var enarrayI = -1;   //エネミー配列回し変数

var enemyup = 0;

var playerDM = 0;
var change_E = 0;
var playerCS = 100;
var playerDM = 0;

var PLBpos = 0;

var enraneY;

var Enemyunit = cc.Layer.extend({
  ctor: function(){
     this._super();

    },
   enItem:function(){
     var tekiunit = new enUnit();
     this.addChild(tekiunit);
   },
   /*update:function(dt){


   },*/

});

var enUnit = cc.Sprite.extend({
  winsize: null,
  ctor: function() {
    this._super();
    this.winsize = cc.director.getWinSize();
    //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
    //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
    switch (enemyup) {
      case 1:
          var sprite =  cc.Sprite.create(cache.getSpriteFrame("brave_otomo01_01"));
          var frame0 = cache.getSpriteFrame("brave_otomo01_01");
          var frame1 = cache.getSpriteFrame("brave_otomo01_02");
          var frame2 = cache.getSpriteFrame("brave_otomo01_03");
          sprite.hp = 5;
          sprite.tag = 1;
        break;

      case 2:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo02_01"));
          var frame0 = cache.getSpriteFrame("brave_otomo02_01");
          var frame1 = cache.getSpriteFrame("brave_otomo02_02");
          var frame2 = cache.getSpriteFrame("brave_otomo02_03");
          sprite.hp = 15;
          sprite.tag = 2;
        break;

      case 3:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo03_01"));
          var frame0 = cache.getSpriteFrame("brave_otomo03_01");
          var frame1 = cache.getSpriteFrame("brave_otomo03_02");
          var frame2 = cache.getSpriteFrame("brave_otomo03_03");
          sprite.hp = 25;
          sprite.tag = 3;
        break;

      case 4:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo04_01"));
          var frame0 = cache.getSpriteFrame("brave_otomo04_01");
          var frame1 = cache.getSpriteFrame("brave_otomo04_02");
          var frame2 = cache.getSpriteFrame("brave_otomo04_03");
          sprite.hp = 35;
          sprite.tag = 4;
        break;

      case 5:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo05_01"));
          var frame0 = cache.getSpriteFrame("brave_otomo05_01");
          var frame1 = cache.getSpriteFrame("brave_otomo05_02");
          var frame2 = cache.getSpriteFrame("brave_otomo05_03");
          sprite.hp = 45;
          sprite.tag = 5;
        break;
      }

      sprite.setPosition(400, enraneY);
      sprite.number = ensuu;
      sprite.attack = false;
      sprite.deth = false;

      //------アニメーションの追加
          var animationframe = [];

              animationframe.push(frame0);
              animationframe.push(frame1);
              animationframe.push(frame2);
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.2);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          sprite.runAction(action);
      //-------アニメーションの追加おわり

      enemyArray.push(sprite);

      this.addChild(sprite);
      ensuu++;

      this.schedule(this.update, 0.025);

      ////■■■■■味方城エフェクト追加■■■■■■■■■■■■■■■■■■■■■■■■■■
      U_efect01 = new cc.ParticleSystem(res.fire);
      U_efect01.setPosition(1000,this.winsize.height * 0.9 );
      this.addChild(U_efect01, 20);
      U_efect01.setAutoRemoveOnFinish(true);

      U_efect02 = new cc.ParticleSystem(res.fire);
      U_efect02.setPosition(1000,this.winsize.height * 0.8 );
      this.addChild(U_efect02, 20);
      U_efect02.setAutoRemoveOnFinish(true);

      U_efect03 = new cc.ParticleSystem(res.fire);
      U_efect03.setPosition(1000,this.winsize.height * 0.7 );
      this.addChild(U_efect03, 20);
      U_efect03.setAutoRemoveOnFinish(true);

    },
//-------アップデート-----
    update: function(dt) {

      if(enemyArray.length > 0){
        if(enarrayI < 0){
          enarrayI = enemyArray.length -1;
        }

      //ユニット配列
      if(enarrayI >= 0){
          if(enemyArray[enarrayI].attack == false){
            //移動速度変更
            enemyArray[enarrayI].setPositionX(enemyArray[enarrayI].getPositionX() - 1);
                        //----------------↓エネミー攻城HPへらし↓-------
            if(enemyArray[enarrayI].getPositionX() < 60 && enemyArray[enarrayI].deth == false){
              enemyArray[enarrayI].setPositionX(60);
                      //味方城ポジション60で止まる

                playerDM++;
                  if(playerDM > 10){
                    if(change == false){
                      //エフェクト
                      audioEngine.playEffect(res.se06_mp3);
                  }

                      playerCS--;
                      playerDM = 0;
                      PLBpos++;
                      var size = PLbar.getContentSize();
                      PLbar.setScaleX(playerCS / 100);
                      PLbar.setContentSize(cc.size(PLbar.width, size.height));

                      switch (enemyArray[enarrayI].getPositionY()) {
                        case 230:
                          Particle01.setPosition(enemyArray[enarrayI].getPositionX(),otomo01y );
                          break;
                        case 190:
                          Particle02.setPosition(enemyArray[enarrayI].getPositionX(),otomo02y );
                          break;
                        case 150:
                          Particle03.setPosition(enemyArray[enarrayI].getPositionX(),otomo03y );
                          break;
                        case 110:
                          Particle04.setPosition(enemyArray[enarrayI].getPositionX(),otomo04y );
                          break;
                        case 70:
                          Particle05.setPosition(enemyArray[enarrayI].getPositionX(),otomo05y );
                          break;
                      }

                      if(playerCS < 99){
                        U_efect01.setPosition(this.winsize.width * 0.1,this.winsize.height * 0.5 );
                      }
                      if(playerCS < 70){
                        U_efect02.setPosition(this.winsize.width * 0.05,this.winsize.height * 0.6 );
                      }
                      if(playerCS < 50){
                        U_efect03.setPosition(this.winsize.width * 0.05,this.winsize.height * 0.45 );
                      }

                      if(playerCS < 20){
                        var b = cc.TransitionFade.create(2.0, new GameOverScene());
                        change = true;
                        cc.director.runScene(b);
                      }
                    }
                }

          }
        enarrayI--;
      }
    }
    },
  });
