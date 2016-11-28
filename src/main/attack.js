var attack;

var gekiha = 0;

attack = cc.Layer.extend({
 ctor: function(){
    this._super();
    this.schedule(this.update, 0.1);
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

            moveP = true;

              if(unitArray01[i].hpP <= 0){
                //ユニットHPが0の(ユニットが負けた)場合
                //console.log("ユニット負け" + i);
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
