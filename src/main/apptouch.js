
var listener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE, //一回だけ反応
//swallowTouches: true,
onTouchBegan: function(touch, event) {
  //ヒントのクリック判定
  //--------------レーンリスト------------------
  if(touch.getLocation().x < 100 && touch.getLocation().x > 50  ){
    if(touch.getLocation().y > 220 && touch.getLocation().y < 240){
    console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
    switch(unitup){
      case 1:
      console.log("しょーかん1ユニ");
      copoint = copoint - 10;
      cost02.setString("所持コスト:" + copoint);
      //maou_otomo01.setVisible(true);
      //otomoset01 = 1;
      otomounit.addItem();
      //this.schedule(this.addunit, 1);
      //リスナーでイベントキャッチ　ontouthch addunitメソッドを呼び出す

      unitup = 0;
      break;

      case 2:
      console.log("しょーかん2ユニ");
      copoint = copoint - 20;
      cost02.setString("所持コスト:" + copoint);
      maou_otomo02.setVisible(true);
      moveon02 = 1;
      //otomoset02 = 1;
      unitup = 0;
      break;

      case 3:
      console.log("しょーかん3ユニ");
      copoint = copoint - 30;
      cost02.setString("所持コスト:" + copoint);
      maou_otomo03.setVisible(true);
      //otomoset03 = 1;
      unitup = 0;
      moveon03 = 1;
      break;

      case 4:
      console.log("しょーかん4ユニ");
      copoint = copoint - 40;
      cost02.setString("所持コスト:" + copoint);
      maou_otomo04.setVisible(true);
      //otomoset04 = 1;
      unitup = 0;
      moveon04 = 1;
      break;

      case 5:
      console.log("しょーかん2ユニ");
      copoint = copoint - 50;
      cost02.setString("所持コスト:" + copoint);
      maou_otomo05.setVisible(true);
      //otomoset05 = 1;
      unitup = 0;
      moveon05 = 1;
      break;
      }
    }
  }
//-------------------ユニットリスト-------------------
//y軸固定
    if( touch.getLocation().y < 37 &&  touch.getLocation().y > 0){

      //--------------ユニット1--------------
      if(touch.getLocation().x < 99 && touch.getLocation().x > 5 ){   console.log("たっちセカンド1ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 1;
      }
      //--------------ユニット2--------------
      if(touch.getLocation().x < 193 && touch.getLocation().x > 100 ){  console.log("たっちセカンド2ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 2;
      }
      //--------------ユニット3--------------
      if(touch.getLocation().x < 285 && touch.getLocation().x > 194 ){  console.log("たっちセカンド3ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 3;
      }
      //--------------ユニット4--------------
      if(touch.getLocation().x < 380 && touch.getLocation().x > 286 ){  console.log("たっちセカンド4ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 4;
      }
      //--------------ユニット5--------------
      if(touch.getLocation().x < 475 && touch.getLocation().x > 381 ){  console.log("たっちセカンド5ユニ" + touch.getLocation().x +" " + touch.getLocation().y);
        unitup = 5;
      }

    }

    //cc.director.runScene(new ResultScene());

  //return true;
},
onTouchMoved: function(touch, event) {},
onTouchEnded: function(touch, event) {},


});
