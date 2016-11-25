//◆敵ユニット配列◆
var enaddUnit;


var enemyArray = [];
var ensuu = 0;      //エネミー配列保存変数
var enarrayI = -1;   //エネミー配列回し変数

var enemyup = 0;

var playerDM = 0;
var cppt = 0;
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
  ctor: function() {
    this._super();
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
            if(enemyArray[enarrayI].getPositionX() < 60){
              enemyArray[enarrayI].setPositionX(60);
                      //味方城ポジション60で止まる
                      kemu.setVisible(true);
                      kemu02.setVisible(true);
                      kemu03.setVisible(true);

                      playerDM++;
                        if(playerDM > 10){
                          cppt++;
                          if(change_E == 0 && cppt == 2){
                            audioEngine.playEffect(res.at01_mp3);
                            cppt = 0;
                        }

                          playerCS--;
                          playerDM = 0;
                          PLBpos++;
                          var size = PLbar.getContentSize();
                          PLbar.setScaleX(playerCS / 100);
                          PLbar.setContentSize(cc.size(PLbar.width, size.height));
                          //ENbar.ignoreAnchorPointForPosition(false);
                          //console.log(ENbar.getPositionX());
                          //コンテンツサイズで画像更新
                          //アンカーポイント0,0でやる
                          //イグノリアフォアアンカーポジション 常にtrue アンカーポイントを無効化 falseで治るかも
                          if(playerCS < 20){
                            var b = cc.TransitionFade.create(2.0, new GameOverScene());
                            change_E = 1;
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
