var attack;

var P_attackArray = [];

attack = cc.Layer.extend({
 ctor: function(){
    this._super();
    //unit = new Unit();
    //this.addChild(unit);
    this.scheduleUpdate();

   },
  /*atItem:function(){
    //console.log("unitには入ってる"); //入ってますねぇ
    tekiunit = new enUnit();
    this.addChild(tekiunit);
  },*/
  update:function(dt){

        for(i = 0; i < unitArray01.length; i++){
          for(n = 0; n < enemyArray.length; n++){
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
              }
              if(enemyArray[n].hp <= 0){
                //エネミーHPが0の(エネミーが負けた)場合
                console.log("エネミー負け" + n);
                enemyArray[n].removeFromParentAndCleanup(true);
                enemyArray[n] = null;
                unitArray01[i].attackP = false;
                enemyArray.splice(n, 1);
                ensuu--;
              }
            }
          }
        }


      //}

  },

});
