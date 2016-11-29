
var listener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE, //一回だけ反応
//swallowTouches: true,
onTouchBegan: function(touch, event) {
  //ヒントのクリック判定
  //--------------レーンリスト------------------
  if(touch.getLocation().x < 100 && touch.getLocation().x > 50 && scene_Un == false){
    if(touch.getLocation().y > 220 && touch.getLocation().y < 240){
      raneY = otomo01y;
      //console.log("レーン1");
      arraytrue = 1;
    }
    if(touch.getLocation().y > 180 && touch.getLocation().y < 200){
      raneY = otomo02y;
      //console.log("レーン2");
      arraytrue = 1;
    }
    if(touch.getLocation().y > 140 && touch.getLocation().y < 160){
      raneY = otomo03y;
      //console.log("レーン3");
      arraytrue = 1;
    }
    if(touch.getLocation().y > 100 && touch.getLocation().y < 120){
      raneY = otomo04y;
      //console.log("レーン4");
      arraytrue = 1;
    }
    if(touch.getLocation().y > 60 && touch.getLocation().y < 80){
      raneY = otomo05y;
      //console.log("レーン5");
      arraytrue = 1;
    }
    //console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
    if(arraytrue == 1){
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
    arraytrue = 0;
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
    }

    //cc.director.runScene(new ResultScene());

  //return true;
},
onTouchMoved: function(touch, event) {},
onTouchEnded: function(touch, event) {},


});
