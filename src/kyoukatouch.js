var K_tuto = false;

var kyoukaTouch = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE, //一回だけ反応
//swallowTouches: true,
  onTouchBegan: function(touch, event) {
    if(touch.getLocation().x < 470 && touch.getLocation().y < 50 && touch.getLocation().x > 300 && touch.getLocation().y > 20 && K_tuto == false){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
      //エフェクト
      audioEngine.playEffect(res.se02_mp3);
      var a = cc.TransitionFade.create(2.0, new StageSelectScene());
      cc.director.runScene(a);
    }
    //タッチ強化
    if(touch.getLocation().x < 230 && touch.getLocation().x > 35 && K_tuto == false){
      //■■■■■ユニット1■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 260 && touch.getLocation().y > 220 && point >= 30){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
        //強化値毎の画像変更
        point = point - 30;
        cpoint.setString("クリアpt:" + point);
        lv_U01++;
        switch(lv_U01){
          case 2 :  hptx01.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    pow_U04 += 10;
                    break;

          case 3 :  powtx01.setSpriteFrame(cache.getSpriteFrame("powhosi02"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    pow_U01 += 1;
                    break;

          case 4 :  hptx01.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    hp_U01 += 10;
                    break;
        }
      }
      //■■■■■ユニット2■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 210 && touch.getLocation().y > 170 && point >= 40){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
        //強化値毎の画像変更
        point = point - 40;
        cpoint.setString("クリアpt:" + point);
        lv_U02++;
        switch(lv_U02){
          case 2 :  powtx02.setSpriteFrame(cache.getSpriteFrame("powhosi03"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    pow_U02 += 1;
                    break;

          case 3 :  powtx02.setSpriteFrame(cache.getSpriteFrame("powhosi04"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    pow_U02 += 1;
                    break;

          case 4 :  hptx02.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    hp_U02 += 10;
                    break;
        }
      }
      //■■■■■ユニット3■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 155 && touch.getLocation().y > 125 && point >= 50){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
        //強化値毎の画像変更
        point = point - 50;
        cpoint.setString("クリアpt:" + point);
        lv_U03++;
        switch(lv_U03){
          case 2 :  powtx03.setSpriteFrame(cache.getSpriteFrame("powhosi02"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    pow_U03 += 1;
                    break;

          case 3 :  powtx03.setSpriteFrame(cache.getSpriteFrame("powhosi03"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    pow_U03 += 1;
                    break;

          case 4 :  hptx03.setSpriteFrame(cache.getSpriteFrame("hphosi04"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    hp_U03 += 10;
                    break;
        }
      }
      //■■■■■ユニット4■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 115 && touch.getLocation().y > 80 && point >= 60){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
        //強化値毎の画像変更
        point = point - 60;
        cpoint.setString("クリアpt:" + point);
        lv_U04++;
        switch(lv_U04){
          case 2 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    hp_U04 += 10;
                    break;

          case 3 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi04"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    hp_U04 += 10;
                    break;

          case 4 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi05"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    hp_U04 += 10;
                    break;
        }
      }
      //■■■■■ユニット5■■■■■■■■■■■■■■■■■■■■■■■■■■
      if(touch.getLocation().y < 70 && touch.getLocation().y > 35 && point >= 70){
      console.log("たっち" + touch.getLocation().x +" " + touch.getLocation().y);
        //強化値毎の画像変更
        point = point - 70;
        cpoint.setString("クリアpt:" + point);
        lv_U05++;
        switch(lv_U05){
          case 2 :  hptx05.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    pow_U05 += 10;
                    break;

          case 3 :  powtx05.setSpriteFrame(cache.getSpriteFrame("powhosi05"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    pow_U05 += 1;
                    break;

          case 4 :  hptx05.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    pow_U05 += 10;
                    break;
        }
      }
      //エフェクト
      audioEngine.playEffect(res.se01_mp3);
    }
    //タッチ強化おわり

    //■■■■■ヘルプへ■■■■■■■■■■■■■■■■■■■■■■■■■■
    if(touch.getLocation().y < 85 && touch.getLocation().y > 10 && touch.getLocation().x < 275 && touch.getLocation().x > 200){
        console.log("たっちへるぷ" + touch.getLocation().x +" " + touch.getLocation().y);
        K_tuto = !K_tuto;

        if(K_tuto == false){
          mode02.setVisible(false);
          console.log("インビジブル起動");
        }
        if(K_tuto == true){
          mode02.setVisible(true);
          console.log("インビジブル解除");
        }
        //エフェクト
        audioEngine.playEffect(res.se02_mp3);
    }
  },
  onTouchMoved: function(touch, event) {},
  onTouchEnded: function(touch, event) {},

});
