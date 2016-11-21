var attack;

var P_attackArray = [];

attack = cc.Layer.extend({
 ctor: function(){
    this._super();
    this.scheduleUpdate();
   },

  update:function(dt){

if(unitArray01.length > 0){
        for(i = unitArray01.length -1 ; i >= 0; i--){
          for(n = enemyArray.length -1 ; n >= 0; n--){
            console.log(unitArray01.length);
            console.log("ユニットx" + unitArray01[i].getPositionX());
            console.log("ユニットy" + unitArray01[i].getPositionY());
            //console.log("エネミーy" + enemyArray[n].getPositionY());
        if(unitArray01[i].getPositionY() == enemyArray[n].getPositionY() &&
          Math.abs(unitArray01[i].getPositionX() + 10) >=  enemyArray[n].getPositionX()){
          //レーンが合っているか、x軸があっているか見る
            unitArray01[i].attackP = true;
            enemyArray[n].attack = true;
            //衝突フラグ立て、その場で停止
            unitArray01[i].hpP--;
            enemyArray[n].hp--;

              if(unitArray01[i].hpP <= 0){
                //ユニットHPが0の(ユニットが負けた)場合
                console.log("ユニット負け" + i);
                unitArray01[i].removeFromParentAndCleanup(true);
                unitArray01[i] = null;
                enemyArray[n].attack = false;
                unitArray01.splice(i, 1);
                array01--;
                array01i --;
                i--;
                console.log("変数下がり" + i);
              }
              if(i < 0){
                console.log("ユニットブレイク");
                break;
              }
              if(enemyArray[n].hp <= 0){
                //エネミーHPが0の(エネミーが負けた)場合
                console.log("エネミー負け" + n);
                switch (enemyArray[n].tag) {
                  case 1:
                    copoint += 10;
                  break;
                  case 2:
                    copoint += 20;
                  break;
                  case 3:
                    copoint += 30;
                  break;
                  case 4:
                    copoint += 40;
                  break;
                  case 5:
                    copoint += 50;

                  break;
                }
                cost02.setString("所持コスト:" + copoint);
                enemyArray[n].removeFromParentAndCleanup(true);
                enemyArray[n] = null;
                unitArray01[i].attackP = false;
                enemyArray.splice(n, 1);
                ensuu--;
                array01i --;
                n--;
              }
              if(n < 0){
                console.log("エネミーブレイク");
                break;
              }
            }
          }
        }
      }

  },

});
