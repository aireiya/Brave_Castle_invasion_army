//◆敵ユニット配列◆
var enaddUnit;


var enemyArray = [];
var ensuu = 0;      //エネミー配列保存変数
var enarrayI = -1;   //エネミー配列回し変数

var enemyup = 0;

var enraneY;

var Enemyunit = cc.Layer.extend({
  ctor: function(){
     this._super();
     //unit = new Unit();
     //this.addChild(unit);

    },
   enItem:function(){
     //console.log("unitには入ってる");
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
          sprite.hp = 5;
          sprite.tag = 1;
        break;

      case 2:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo02_01"));
          sprite.hp = 15;
          sprite.tag = 2;
        break;

      case 3:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo03_01"));
          sprite.hp = 25;
          sprite.tag = 3;
        break;

      case 4:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo04_01"));
          sprite.hp = 35;
          sprite.tag = 4;
        break;

      case 5:
          var sprite = cc.Sprite.create(cache.getSpriteFrame("brave_otomo05_01"));
          sprite.hp = 45;
          sprite.tag = 5;
        break;
      }

      //console.log("敵Y座標" + enraneY);
      sprite.setPosition(400, enraneY);
      sprite.number = ensuu;
      sprite.attack = false;

      enemyArray.push(sprite);

      //unitupp

      this.addChild(enemyArray[ensuu]);
      //console.log(enemyArray.length);
      ensuu++;

      //console.log("敵うぉぉん");

      this.scheduleUpdate();

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
            enemyArray[enarrayI].setPositionX(enemyArray[enarrayI].getPositionX() - 1);
            if(enemyArray[enarrayI].getPositionX() < 50){
              enemyArray[enarrayI].setPositionX(50);
            }
          }
        enarrayI--;
      }
    }
    },
  });
