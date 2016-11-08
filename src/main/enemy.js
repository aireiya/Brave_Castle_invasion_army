//◆敵ユニット配列◆
var enaddUnit;
var Enemyunit;

var enemyArray = [];
var enemyArrayX = [];
var enemyArrayY = [];
var enarrayI = 0;
var enarraytrue = 0;
var ensuu = 0;

var enemyup = 0;

var enraneY;

 Enemyunit = cc.Layer.extend({
  ctor: function(){
     this._super();
     //unit = new Unit();
     //this.addChild(unit);

    },
   enItem:function(){
     //console.log("unitには入ってる"); //入ってますねぇ
     tekiunit = new enUnit();
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
        break;

      case 2:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo02_01"));
        break;

      case 3:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo03_01"));
        break;

      case 4:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo04_01"));
        break;

      case 5:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo05_01"));
        break;
      }

      console.log("敵Y座標" + enraneY);
      sprite.setPosition(400, enraneY);
      enemyArrayX.push(400);
      enemyArrayY.push(enraneY);
      enemyArray.push(sprite);
      //unitupp

      this.addChild(enemyArray[ensuu]);
      console.log(enemyArray.length);
      ensuu++;

      //console.log("敵うぉぉん");

      this.scheduleUpdate();

    },

    update: function(dt) {


      //ユニット配列
      if(enarrayI < enemyArray.length){
        enemyArrayX[enarrayI] = enemyArrayX[enarrayI] - 1;

        //console.log(unitArray01[array01i ] + "いちー"　+ unitArray01x[array01i]);

        //unitArray01[array01i] = cc.Sprite.create(cache.getSpriteFrame("maou_otomo0" + unituppt[array01i] + "_0" + gazopt ));
        enemyArray[enarrayI].setPosition(enemyArrayX[enarrayI], enemyArrayY[enarrayI]);
        if(enemyArray[enarrayI].getPositionX() < 50){
          enemyArray[enarrayI].setPosition(50, enemyArrayY[enarrayI]);
        }
        enarrayI++;
      }
      else enarrayI = 0;
    },
  });
