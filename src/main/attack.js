var attack;

var gekiha = 0;

var Particle01;
var Particle02;
var Particle03;
var Particle04;
var Particle05;

var U_se = 0;
var E_se = 0;

attack = cc.Layer.extend({
 ctor: function(){
    this._super();
    this.schedule(this.update, 0.1);

    //エフェクト追加レーン1
    Particle01 = new cc.ParticleSystem(res.kemuri);
    Particle01.setPosition(1000,otomo01y );
    this.addChild(Particle01, 20);
    Particle01.setAutoRemoveOnFinish(true);

    //エフェクト追加レーン2
    Particle02 = new cc.ParticleSystem(res.kemuri);
    Particle02.setPosition(1000,otomo02y );
    this.addChild(Particle02, 20);
    Particle02.setAutoRemoveOnFinish(true);

    //エフェクト追加レーン3
    Particle03 = new cc.ParticleSystem(res.kemuri);
    Particle03.setPosition(1000,otomo03y );
    this.addChild(Particle03, 20);
    Particle03.setAutoRemoveOnFinish(true);

    //エフェクト追加レーン3
    Particle03 = new cc.ParticleSystem(res.kemuri);
    Particle03.setPosition(1000,otomo03y );
    this.addChild(Particle03, 20);
    Particle03.setAutoRemoveOnFinish(true);

    //エフェクト追加レーン4
    Particle04 = new cc.ParticleSystem(res.kemuri);
    Particle04.setPosition(1000,otomo04y );
    this.addChild(Particle04, 20);
    Particle04.setAutoRemoveOnFinish(true);

    //エフェクト追加レーン5
    Particle05 = new cc.ParticleSystem(res.kemuri);
    Particle05.setPosition(1000,otomo05y );
    this.addChild(Particle05, 20);
    Particle05.setAutoRemoveOnFinish(true);
   },

  update:function(dt){

if(unitArray01.length > 0){

        for(i = unitArray01.length -1 ; i >= 0; i--){
          var moveP = false;
          for(n = enemyArray.length -1 ; n >= 0; n--){

        if(unitArray01[i].getPositionY() == enemyArray[n].getPositionY() &&
          Math.abs(unitArray01[i].getPositionX() + 5) >=  enemyArray[n].getPositionX() ){
            if( enemyArray[n].deth == false && unitArray01[i].deth == false){
          //レーンが合っているか、x軸があっているか見る
            unitArray01[i].attackP = true;
            enemyArray[n].attack = true;
            //衝突フラグ立て、その場で停止
            unitArray01[i].hpP--;
            enemyArray[n].hp -= unitArray01[i].atk;

            U_se++;
            E_se++;

            if(U_se > 5){
              //エフェクト
              audioEngine.playEffect(res.se05_mp3);
              U_se = 0;
            }
            if(E_se > 7){
              //エフェクト
              audioEngine.playEffect(res.se06_mp3);
              E_se = 0;
            }

            moveP = true;

            switch (enemyArray[n].getPositionY()) {
              case 230:
                Particle01.setPosition(enemyArray[n].getPositionX(),otomo01y );
                break;
              case 190:
                Particle02.setPosition(enemyArray[n].getPositionX(),otomo02y );
                break;
              case 150:
                Particle03.setPosition(enemyArray[n].getPositionX(),otomo03y );
                break;
              case 110:
                Particle04.setPosition(enemyArray[n].getPositionX(),otomo04y );
                break;
              case 70:
                Particle05.setPosition(enemyArray[n].getPositionX(),otomo05y );
                break;
            }

              if(unitArray01[i].hpP <= 0){
                //ユニットHPが0の(ユニットが負けた)場合
                //console.log("ユニット負け" + i);
                if(unitArray01[i].deth == false){
                switch (enemyArray[n].getPositionY()) {
                  case 230:
                    Particle01.setPosition(1000,otomo01y );
                    break;
                  case 190:
                    Particle02.setPosition(1000,otomo02y );
                    break;
                  case 150:
                    Particle03.setPosition(1000,otomo03y );
                    break;
                  case 110:
                    Particle04.setPosition(1000,otomo04y );
                    break;
                  case 70:
                    Particle05.setPosition(1000,otomo05y );
                    break;
                }
                //エフェクト
                audioEngine.playEffect(res.se03_mp3);
              }
                unitArray01[i].removeFromParentAndCleanup(true);
                //unitArray01[i] = null;
                enemyArray[n].attack = false;
                unitArray01[i].deth = true;
                //unitArray01.splice(i, 1);
                //★★★spliceで消さずに、透明・あたり判定なしでその場に残すしょりに
                //array01--;
                //array01i --;
                //i--;
              }
              if(enemyArray[n].hp <= 0){
                //エネミーHPが0の(エネミーが負けた)場合
                //console.log("エネミー負け" + n);
                switch (enemyArray[n].tag) {
                  case 1:
                    copoint += 15;
                  break;
                  case 2:
                    copoint += 25;
                  break;
                  case 3:
                    copoint += 35;
                  break;
                  case 4:
                    copoint += 45;
                  break;
                  case 5:
                    copoint += 55;

                  break;
                }
                if(enemyArray[n].deth == false){
                switch (enemyArray[n].getPositionY()) {
                  case 230:
                    Particle01.setPosition(1000,otomo01y );
                    break;
                  case 190:
                    Particle02.setPosition(1000,otomo02y );
                    break;
                  case 150:
                    Particle03.setPosition(1000,otomo03y );
                    break;
                  case 110:
                    Particle04.setPosition(1000,otomo04y );
                    break;
                  case 70:
                    Particle05.setPosition(1000,otomo05y );
                    break;
                }
              }
                gekiha++;
                cost02.setString("所持コスト:" + copoint);
                enemyArray[n].removeFromParentAndCleanup(true);
                //enemyArray[n] = null;
                unitArray01[i].attackP = false;
                enemyArray[n].deth = true;
                //enemyArray.splice(n, 1);
                //ensuu--;
                //array01i --;
                //n--;

                //エフェクト
                audioEngine.playEffect(res.se03_mp3);
              }
            }
          }

         }//enemyArray[n]終了
          if(unitArray01[i].deth == false && moveP == false && unitArray01[i].attackP == true){
            //死んでない、敵と当たってない、でもあたり判定はtrueの時
            unitArray01[i].attackP = false;
          }//複数体同時戦闘時、1体しか再移動しない不具合解消用
        }//unitArray01[i]終了
      }

  },

});
